---
title: Architecture First, Apollo-To-Tanstack Migration That Delighted Business
description: Architectural wrappers, a shared axios client, and gradual rollouts let us replace Apollo Client with TanStack Query on a large codebase without disrupting product delivery.
published: 2026-01-06
tags: [react, graphql, typescript]
---

## Why We Chose To Migrate

Apollo Client always looked like a stable, well-documented workhorse, yet over the last few release cycles we were forced to pause more and more often:

- Breaking changes slipped into minor and even patch releases, making npm audit fix risky.
- Major releases dropped incompatible APIs, so every upgrade meant visiting hundreds of call sites because we never wrapped Apollo’s hooks.
- Security upgrades were mandatory, so the amount of manual rework was growing exponentially.
- Hidden behavioural changes-especially around cache semantics-kept showing up in new releases without documentation, so we only caught them during debugging or when scanning GitHub issues.

At some point, it was cheaper to migrate than to keep patching the same surface area. We chose TanStack Query because it gives us predictable updates and first-class support for declarative caching. Below is how we kept the migration low risk.

## What We Rebuilt Around TanStack Query

- TanStack Query now wraps the legacy GraphQL provider so both caches can run side by side while we migrate feature by feature.
- A shared axios client re-implements Apollo link behaviours (auth headers, refresh token queueing, error surfacing) once for the entire codebase.
- Hook wrappers mimic Apollo signatures, keeping downstream code untouched while we swap implementations behind the scenes.
- Shared utilities-response normalisation, pagination helpers, and typed document nodes-bridge the gap between the old and new stacks.

## How We Delivered The Migration

### Stabilize the Provider Layer

- Flattened Apollo’s folder structure so defaults, links, and fragments expose a single entry point.
- Mounted TanStack Query one level above Apollo, letting both providers coexist during the rollout.
- Cloned pagination helpers into the TanStack namespace so tables can switch providers without rewriting call sites.

### Rebuild Token Refresh in Axios

Apollo’s link chain handled retries and token refresh for us. We reimplemented the behaviour in a single axios client that every hook uses under the hood.

```ts
// providers/tanstack-query/client.ts

client.interceptors.response.use(
  async (response: AxiosResponse<GraphQlResponse>): Promise<AxiosResponse<GraphQlResponse>> => {
    const isUnauthorized = Boolean(
      response.data.errors?.some((err: ServerError) => err.extensions?.code === 'UNAUTHORIZED'),
    )
    if (!isUnauthorized) {
      return response
    }

    const originalRequest: AxiosRequestConfig<GraphQlResponse> = response.config
    if (isRefreshing) {
      return addToQueue(originalRequest)
    }

    isRefreshing = true
    try {
      const refreshTokenResult: RefreshTokenResult = await refreshToken()
      if (refreshTokenResult?.accessToken === undefined) {
        return response
      }

      const { accessToken } = refreshTokenResult
      // since it's all async, we should immediately stop before creating the queue to minimize side effects
      isRefreshing = false

      queue.forEach((queuedRequest: QueueItem): void => queuedRequest(accessToken))
      queue = []

      return client({
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      })
    } catch {
      isRefreshing = false
      queue = []
      throw Error(t('error.unableToRefreshToken', { ns: 'providers/tanstackQuery' }))
    }
  },
)

let isRefreshing: boolean = false
type QueueItem = (accessToken: string) => void
let queue: QueueItem[] = []

const addToQueue = (
  originalRequest: AxiosRequestConfig,
): Promise<AxiosResponse<GraphQlResponse>> => {
  return new Promise(resolve => {
    queue.push((accessToken: string): void => {
      resolve(
        client({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      )
    })
  })
}
```

The interceptor restores failed requests after refreshing the token and keeps a queue so that simultaneous 401 responses do not stampede the backend.

### Wrap TanStack Query in Familiar Hooks

Because no ready-made codemod existed and we saw no reason to build one, we wrote thin wrappers that mimic Apollo’s useQuery and useMutation. They keep the old signatures (returning loading, mutate, and onCompleted), but internally drive TanStack Query.

```ts
// providers/tanstack-query/useMutation.ts

export const useMutation = <
  Variables extends Record<string, unknown>,
  ResponseData extends ResponseDataShape,
>({
  mutation,
  onCompleted,
  options,
  queriesToInvalidate,
}: Props<Variables, ResponseData>) => {
  type TData = GraphQlResponse<ResponseData> | void
  const key: MutationKey = getKey(mutation)

  return tanstackUseMutation<TData, DefaultError, Variables>({
    mutationFn: async (variables: Variables): Promise<TData> => {
      return request<Variables, ResponseData>({
        key,
        query: mutation,
        variables,
      })
    },
    mutationKey: key,
    onSuccess: (
      response: TData,
      _variables: unknown,
      _onMutateResult: unknown,
      context: MutationFunctionContext,
    ): void => {
      const data: ResponseData | undefined = handleResponse200<ResponseData>({
        response,
      })

      if (data !== undefined) {
        onCompleted(data).finally(async (): Promise<void> => {
          if (queriesToInvalidate !== undefined && queriesToInvalidate.length > 0) {
            await context.client.invalidateQueries({
              queryKey: queriesToInvalidate,
            })
          }
        })
      } else {
        return undefined
      }
    },
    ...options,
  })
}
```

useQuery follows the same recipe and returns isLoading, which we alias back to loading in legacy hooks so no consumer needs to change.

```ts
// providers/tanstack-query/useQuery.ts

export const useQuery = <
  Variables extends Record<string, unknown>,
  ResponseData extends ResponseDataShape,
>({
  onCompleted,
  options,
  query,
  variables,
}: Props<Variables, ResponseData>) => {
  const key: QueryKey = getKey(query)

  return tanstackUseQuery<ResponseData | undefined, DefaultError>({
    queryFn: async (): Promise<ResponseData | undefined> => {
      const response: GraphQlResponse<ResponseData> | void = await request<Variables, ResponseData>(
        {
          key,
          query,
          variables,
        },
      )

      const data: ResponseData | undefined = handleResponse200<ResponseData>({
        response,
      })

      if (data !== undefined) {
        onCompleted(data)
      }
      return data
    },
    queryKey: [...key, ...(variables ? [variables] : [])],
    ...options,
  })
}
```

### Centralize GraphQL Response Handling

- TanStack Query expects predictable success payloads, so we centralised GraphQL handling in a shared helper.
- The helper mirrors Apollo’s implicit behaviour: return data when present, surface validation errors, and fall back to enqueueing UI notifications.

```ts
// providers/tanstack-query/response.ts

export const handleResponse200 = <ResponseData extends ResponseDataShape>({
  response,
}: {
  response: GraphQlResponse<ResponseData> | void
}): ResponseData | undefined => {
  const hasError = (errors: GraphQlResponse<ResponseData>['errors']): errors is ServerError[] =>
    !isNil(errors) && errors.length > 0

  const hasResponseData = (data: GraphQlResponse<ResponseData>['data']): data is ResponseData =>
    data !== undefined && data !== null

  if (response === undefined) {
    return undefined
  } else if (hasError(response.errors)) {
    handleErrors200(response.errors)
  } else if (hasResponseData(response.data)) {
    return response.data
  }
}
```

### Bridge Apollo TypeScript Utilities

- Apollo shipped utility types such as TypedDocumentNode, while TanStack Query does not.
- During the migration, we re-exported those types from @graphql-typed-document-node/core and pointed all GraphQL modules to the new source.
- Once graphql-code-generator lands, we can generate the same shapes directly from the schema and remove the bridge.

```ts
// providers/tanstack-query/types.ts

export type { TypedDocumentNode } from '@graphql-typed-document-node/core'

export type GraphQlResponse<TData = ResponseDataShape> = TData extends ResponseDataShape
  ? {
      data: TData
      errors?: null | ServerError[]
    }
  : Record<string, unknown> & {
      data?: null | Partial<AuthenticationToken>
      errors?: null | ServerError[]
    }

export type ResponseDataShape = {
  [name: string]:
    | null
    | unknown[]
    | {
        [element: string]: null | undefined | unknown | unknown[]
        errors?: MutationInputError[] | null
      }
}
```

GraphQlResponse keeps TanStack Query payloads compatible with Apollo-era expectations, while ResponseDataShape constrains nested error collections so shared helpers stay generic. The structure mirrors the backend we target, so the generated types stay truthful to what the API actually returns.

### Move Critical Features Without Touching Call Sites

User-facing features such as authentication, invitations, and session management moved first, along with the product and workspace flows. Hooks changed only internally, and the public API stayed the same.

Before (Apollo):

```ts
// features/product/hooks/useUpdateProduct.ts

const [mutate] = useMutation(UPDATE_PRODUCT, {
  onCompleted: ({ updateProduct }: Data): void => {
    if (updateProduct) {
      const { errors, product } = updateProduct

      if (errors && errors.length > 0) {
        ...
      } else if (product) {
        ...
    }
  },
  refetchQueries: ["getProducts"],
})
```

After (TanStack Query):

```ts
// features/product/hooks/useUpdateProduct.ts

const { mutateAsync } = useMutation<{ input: VariablesDTO }, Data>({
  mutation: UPDATE_PRODUCT,
  onCompleted: async (data) => {
    const {
      updateProduct: { errors, product },
    } = data

    if (errors && errors.length > 0) {
      ...
    } else if (product) {
      ...
    }
  },
  queriesToInvalidate: ["getProducts"],
})
```

The hook still exposes mutateAsync, so calling components keep their old entry point. TanStack Query drives the onCompleted callback and targets cache eviction through queriesToInvalidate. The rest of the orchestration lives inside the wrappers, so consumers only see the same method signatures while the caching behaviour evolves underneath. We no longer rely on refetchQueries because selective invalidation keeps dependent views in sync without extra network traffic.

### Mirror Shared Utilities During Rollout

Shared helpers for tables, forms, and any code that touches request or response payloads stay mirrored in both stacks, so features can switch providers without rewrites. We keep the legacy helpers alongside the new ones until every feature migrates, which keeps the caches aligned.

## Rollout Checklist

- Coexistence period. Both providers stay mounted while we migrate feature by feature.
- Code generation. graphql-code-generator will replace the temporary TypedDocumentNode bridge once we move beyond our current mapping between DTO and OM objects based on their data types.
- Feature-by-feature rollout. Hook signatures stay almost untouched, so we can migrate one slice of the application at a time.
- Final cleanup. When the last feature flips, we can drop the Apollo provider entirely.

## Key Takeaways

- Wrap third-party hooks immediately so breaking upgrades stop turning into all-or-nothing rewrites.
- Keep token refresh logic close to the HTTP client-switching libraries is then a one-time job.
- A parallel rollout protects critical paths (auth) while letting the rest of the codebase catch up gradually.
