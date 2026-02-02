---
title: Docker Anti-Patterns
description: Common Docker mistakes and production-ready fixes
published: 2026-02-02
tags: [docker, dev-ops]
---

Docker is easy to start with and easy to misuse. Below is a list of the most common Docker anti-patterns and how to fix them correctly.

## 1. Using the 'latest' Tag

Bad:

```dockerfile
FROM node:latest
```

Problem:

- Non-reproducible builds
- Unexpected breakages after rebuilds

Good:

```dockerfile
FROM node:25.5.0-alpine3.22
```

Always pin exact versions. Upgrade intentionally.

## 2. Bloated Base Images

Bad:

```dockerfile
FROM ubuntu:22.04
```

Problem:

- Unnecessary packages
- Large image size
- Bigger attack surface

Good:

```dockerfile
FROM node:25-alpine3.22
```

Use the lightweight `-alpine` images whenever possible.

## 3. Killing the Build Cache

Bad:

```dockerfile
COPY . .
RUN npm install
```

Problem:

- Dependencies reinstalled on change any file

Good:

```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
```

Order Dockerfile instructions by change frequency.

## 4. Running as Root

Bad:

```dockerfile
WORKDIR /app
COPY . .
CMD npm run dev
```

Problem:

- Compromised app can run with root privileges

Good:

```dockerfile
ARG APP_USER_ID=10001
ARG APP_GROUP_ID=10001
WORKDIR /app
COPY --chown=${APP_USER_ID}:${APP_GROUP_ID} . .
USER ${APP_USER_ID}:${APP_GROUP_ID}
CMD npm run dev
```

Always drop root unless absolutely required.

## 5. Hardcoding Secrets

Bad:

```dockerfile
ENV SECRET=...
```

Problem:

- Secrets permanently stored in image layers

Good:

- Pass secrets at runtime
- Use Docker secrets

Example:

```bash
docker run -e SECRET=$SECRET myapp
```

Secrets must never end up in images.

## 6. Missing `.dockerignore`

Bad:
No `.dockerignore` file

Problem:

- Large build contexts
- Slower builds

Good example:

```gitignore
.git
node_modules
```

Exclude everything not needed at runtime.

## 7. No Health Checks

Problem:

- Running container does not mean healthy application

Good:

```dockerfile
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
```

Health checks allow orchestrators to detect failures.

## 8. One Image for Development and Production

Bad:

- Debug tools shipped to production

Problem:

- Larger images
- Increased attack surface

Good:

- Use multi-stage builds
- Separate development, build, and production stages

Example:

```dockerfile
FROM node:25-alpine3.22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# ...

FROM node:25-alpine3.22 AS development
WORKDIR /app
COPY --from=builder /app ./
# ... some dev tools ...

FROM node:25-alpine3.22 AS production
WORKDIR /app
COPY --from=builder /app ./
# ... some production tools ...
```

Build for environment (stage):

```bash
docker build -t myapp:dev --target development .
```

Build only the required target.

## 9. Inefficient Layer Usage

Bad:

```dockerfile
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y wget
RUN apt-get clean
```

Problem:

- Inefficient because each `RUN` creates a new layer

Good:

```dockerfile
RUN apt-get update && \
        apt-get install -y curl && \
        apt-get install -y wget && \
        apt-get clean
```

Combine related commands into a single layer.

## 10. Never Updating Base Images

Problem:

- Outdated images contain known CVEs

Good:

```bash
docker scout cves myapp:latest
```

Scan regularly and update base images on a schedule.
