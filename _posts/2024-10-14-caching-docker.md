---
layout: post
title: Caching Docker Compose services in GitHub Actions
description: Dockerized app builds with GitHub Actions using GCR or local cache for faster builds, combining GCR's broad range and local cache's speed for efficiency  - summarized with AI.
date: 2024-10-14
tags: [docker, dev-ops]
categories: [programming]
---

# Dictionary

- GCR - GitHub Container Registry
- Workflow, Job, Action - GitHub Actions stuff

# Scenario

- dockerized app with Docker Compose
  - e.g. services: Backend, Postgresql, Frontend
- GitHub Action Workflow with separated and dependent Jobs
  - e.g. Frontend Job needs Backend Job to work

# Where is the problem?

- GitHub Actions Jobs in Workflow are separated from each other
  - we can't share between them network or data without upload/download
- community Actions from GitHub Marketplace for Docker caching are:
  - targeted for specific maintainer's problem
  - not maintained
  - using heavy third party actions or packages
  - do not take into account Compose
- Docker documentatnion
  - forces the use of their registry
  - overwhelms with widely scattered architecture (compose, build, bake etc.)
  - don't explains about caching with Compose

# Build all images at once

```yml
services:
  backend:
    depends_on:
      - postgres

  postgres:
    image: postgres:xxx

  frontend:
```

{: file="docker-compose.yml" }

`docker compose build backend` will built only Backend because Postgresql service is used as `backend.depends_on` so it will be built on runtime.

On CI we need to prebuild all services at once.
The solution is to create a fake Dockerfile for Postgresql service. We can to this inline.

```yml
postgres:
  dockerfile_inline: |
    FROM postgres:xxx
```

{: file="docker-compose.yml" }

# Workflow

Schema:

```
- frontend-unit-tests

- backend-docker  --|-->    backend-unit-tests
                    |
                    |-->    frontend-e2e-test
```

Config:

```yml
jobs:
  frontend-unit-tests:

  backend-docker:

  backend-unit-tests:
    needs: backend-docker

  frontend-e2e-test:
    needs: backend-docker
```

{: file="workflow.yml" }

# Caching ways

We do not want to store cache outside of GitHub so we can:

- store cache in a [GCR](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- store cache in a standard GitHub Actions way using [Cache action](https://github.com/marketplace/actions/cache)

## Store cache in a GCR

Use [Docker Buildx Bake](https://github.com/marketplace/actions/docker-buildx-bake) action.

[Bake](https://docs.docker.com/build/bake/) can build all services from `docker-compose.yml`. It actually runs `docker buildx bake` where [buildx](https://docs.docker.com/reference/cli/docker/buildx/) is an extended version of `docker build`.

```yml
jobs:
  backend-docker:
    - name: Login to GCR
      uses: docker/login-action@xxx
      with:
        registry: ghcr.io

    - name: Build services and import & export cache with GCR
      uses: docker/bake-action@xxx
      with:
        files: docker-compose.yml,cache-ghcr-import-export.json
        targets: backend,postgres
```

{: file="workflow.yml" }

Bake config with import & export paths.

```jsonc
{
  "target": {
    "backend": {
      "cache-from": ["type=gha,ref=ghcr.io/ORG/REPO/backend"],
      "cache-to": ["type=gha,mode=max,ref=ghcr.io/ORG/REPO/backend"],
      "output": ["type=docker"]
    },
    "postgres": {
      "cache-from": ["type=gha,ref=ghcr.io/ORG/REPO/postgres"],
      "cache-to": ["type=gha,mode=max,ref=ghcr.io/ORG/REPO/postgres"],
      "output": ["type=docker"]
    }
  }
}
```

{: file="cache-ghcr-import-export.json" }

## Store cache locally in GitHub Actions

### Build services and save cache

Use Bake and pay attention to:

- cache path `tmp/docker-cache`
- `hashFiles('tmp/docker-cache/**')` function as cache key

```yml
jobs:
  backend-docker:
    - name: Build services and save cache
      uses: docker/bake-action@xxx
      with:
        files: docker-compose.yml,cache-local-save.json
        targets: backend,postgres

    - name: Save cache
      id: docker-cache-save
      uses: actions/cache/save@xxx
      with:
        path: tmp/docker-cache
        {% raw %}key: docker-cache-${{ hashFiles('tmp/docker-cache/**') }}{% endraw %}
```

{: file="workflow.yml" }

Bake config file with path to save.

```jsonc
{
  "target": {
    "backend": {
      "cache-to": ["type=local,mode=max,dest=tmp/docker-cache"],
      "output": ["type=docker"]
    },
    "postgres": {
      "cache-to": ["type=local,mode=max,dest=tmp/docker-cache"],
      "output": ["type=docker"]
    },
    "redis": {
      "cache-to": ["type=local,mode=max,dest=tmp/docker-cache"],
      "output": ["type=docker"]
    },
    "minio": {
      "cache-to": ["type=local,mode=max,dest=tmp/docker-cache"],
      "output": ["type=docker"]
    }
  }
}
```

{: file="cache-local-save.json" }

### Restore cache

Pay attention to:

- instances of `docker-cache-restore` as step ID
- `if: steps.docker-cache-restore.outputs.cache-hit != 'true'` which prevents to re-build when cache exists

```yml
jobs:
  backend-docker:
    - name: Restore cache
      id: docker-cache-restore
      uses: actions/cache/restore@vxxx
      with:
        path: tmp/docker-cache
        {% raw %}key: docker-cache-${{ hashFiles('tmp/docker-cache/**') }}{% endraw %}


    - name: Build services and restore cache
      if: steps.docker-cache-restore.outputs.cache-hit != 'true'
      uses: docker/bake-action@xxx
      with:
        files: docker-compose.yml,cache-local-restore.json
        targets: backend,postgres,redis,minio
```

{: file="workflow.yml" }

Bake config with cache restore paths.

```jsonc
{
  "target": {
    "backend": {
      "cache-from": ["type=local,src=tmp/docker-cache"]
    },
    "postgres": {
      "cache-from": ["type=local,src=tmp/docker-cache"]
    }
  }
}
```

{: file="cache-local-restore.json" }

# Summary

From my experience GCR cache lives longer and is has wider range (branches). GCR with Bake has less steps and configs.
On the other hand, local cache with `actions/cache` is faster to save/restore.

The best is to combine both at the same time with the "if cache exists" condition. E.g. for wider range, start with GCR and later on branch use only local cache.
