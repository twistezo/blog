---
title: Utility For Easy Mapping Between DTO And OM Objects Based On Their Data Types
description: A minimal mapDTO helper keeps DTO ↔ Object Model transformations type-safe, readable, and testable without decorators or inheritance chains.
published: 2025-08-22
tags: [typescript, npm]
---

## Why We Ditched Class-Based Mappers

As DTOs drifted from domain models we accumulated static helpers, decorator DSLs, and class hierarchies that obscured simple field moves. They bloated bundles, confused new teammates, and still left us writing defensive unit tests. mapDTO replaces that stack with one generic function, keeping every transformation explicit and type-checked.

## mapDTO In One Glance

```ts
export const mapDTO = <From = unknown, To = unknown>({
  from,
}: {
  from: From
}): {
  transform: (callback: (from: From) => To) => To
} => ({
  transform: callback => callback(from),
})
```

It captures the source object, hands it to a callback, and relies on `<From, To>` generics to guard the output. No decorators, metadata, or hidden state—just a tiny bridge that mirrors Array.map semantics.

## Mapping Both Ways

A single helper handles both directions cleanly. One call turns an API payload into the domain object, splitting a full name and normalising IDs, while the inverse just swaps the generics to emit the DTO again. If a field goes missing, the compiler flags the mismatch before runtime.

## Why It Stays Maintainable

Heavy mappers demand reflection, configuration files, or build-time metadata. mapDTO treats every conversion as a pure function, so reviewers see exactly what leaves each boundary, editors surface correct hints, and tree-shaking removes unused paths.

## When mapDTO Shines

- Maintaining a clear seam so backend shape changes surface in the mapper first—you update the DTO type, fix the matching field, and the rest of the app stays untouched.
- Catching incompatible API responses early; the mapper fails fast, keeping surprises out of UI flows and business rules.
- Crossing API, persistence, or UI boundaries where shapes differ.
- Keeping optional fields explicit without sprinkling null checks across the app.
- Composing mappers in functional pipelines without pulling in decorators.

If your DTO already matches the domain model, passing data straight through still wins.

## Real-World User Mapping

```ts
// user.ts
export type User = {
  createdAt: Date
  features: UserFeature[]
  firstName: string
  lastName: string
  updatedAt: Date
  workspaces: Workspace[]
}

// userDTO.ts
export type UserDTO = {
  createdAt: string
  features: UserFeatureDTO[]
  firstName: null | string
  lastName: null | string
  updatedAt: string
  workspaces: WorkspaceDTO[]
}

// userMapper.ts
export const userFromDTO = from =>
  mapDTO<UserDTO, User>({ from }).transform(userDTO => {
    const { createdAt, features, firstName, lastName, updatedAt, workspaces } = userDTO

    return {
      createdAt: new Date(createdAt),
      features,
      firstName: firstName || '',
      lastName: lastName || '',
      updatedAt: new Date(updatedAt),
      workspaces: workspaces.map((workspaceDTO: WorkspaceDTO) => workspaceFromDTO(workspaceDTO)),
    }
  })
```

This mapper keeps API-specific quirks contained so the rest of the app works with clean domain objects. Conversions for dates, nullable relations, and nested workspaces stay in one place, making reviews obvious and regressions easy to spot. When the backend contract shifts, the compiler highlights a single mapper instead of letting subtle issues leak elsewhere.

## Library

I published the helper as [@twistezo/ts-dto-mapper](https://www.npmjs.com/package/@twistezo/ts-dto-mapper).

## Closing Thoughts

mapDTO keeps API drift away from core product code by funnelling every change through a tiny, type-safe mapper layer. Real-world usage proves the pattern scales from simple DTOs to nested structures without resorting to heavyweight libraries. If you need predictable transformations and maintainable boundaries, the helper delivers the guardrails with almost no overhead.
