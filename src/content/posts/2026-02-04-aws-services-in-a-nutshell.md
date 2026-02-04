---
title: AWS Services Overview
description: A quick rundown of the most popular AWS services, what they do, and how teams commonly combine them into production stacks.
published: 2026-02-04
tags: [aws, dev-ops, cloud]
---

## Popular Stacks

### Serverless Web App

```
Route 53 → CloudFront → S3 (frontend)
                      ↓
               API Gateway → Lambda → DynamoDB
```

No servers to manage. Scales to zero when idle.

### Containerised Microservices

```
Route 53 → ALB → ECS (Fargate)
                    ↓
               ECR (images)
               RDS (PostgreSQL)
               ElastiCache (Redis)
               S3 (uploads)
```

Classic SaaS stack. Replace ECS with EKS if you need Kubernetes.

### Rails / Node Backend

```
ALB → ECS → RDS (PostgreSQL)
        ↓
   ElastiCache (Redis for Sidekiq/BullMQ)
   S3 (ActiveStorage / Multer uploads)
   SQS (async jobs)
```

ElastiCache handles background job queues; SQS decouples heavier workflows.

### Static Site with API

```
CloudFront → S3 (Next.js/Astro export)
         ↓
   API Gateway → Lambda → RDS (Aurora Serverless)
```

Frontend cached globally; backend scales on demand.

## Compute

### EC2 (Elastic Compute Cloud)

> virtual machines on demand

Full control over OS, networking, and storage—ideal for custom runtimes, GPU workloads, or long-running processes.

### Lambda

> run code without managing servers

Event-driven functions triggered by API Gateway, S3, SQS, or schedules—pay only for execution time.

### ECS (Elastic Container Service)

> run Docker containers at scale

AWS-managed orchestration that schedules tasks across EC2 or Fargate—simpler than Kubernetes within the AWS ecosystem.

### EKS (Elastic Kubernetes Service)

> managed Kubernetes

AWS handles the control plane while you manage worker nodes or use Fargate for serverless pods.

### Fargate

> serverless compute for containers

No EC2 to provision—define CPU/memory per task for ECS or EKS and AWS allocates resources automatically.

## Storage

### S3 (Simple Storage Service)

> object storage for anything

Unlimited capacity for files, frontends, uploads, and logs—pair with CloudFront for global delivery.

### EBS (Elastic Block Store)

> persistent block storage for EC2

Attach SSD or HDD volumes to instances with snapshot support for backups and migrations.

### EFS (Elastic File System)

> shared file system across instances

NFS-compatible filesystem that multiple EC2 instances or containers can mount simultaneously.

## Container Registry

### ECR (Elastic Container Registry)

> private Docker image storage

Push images from CI into ECS/EKS/Lambda with IAM access control and built-in vulnerability scanning.

## Databases

### RDS (Relational Database Service)

> managed relational databases

PostgreSQL, MySQL, MariaDB, Oracle, or SQL Server with automated patching, backups, and Multi-AZ failover.

### Aurora

> AWS-native relational engine

MySQL/PostgreSQL-compatible with better performance, auto-scaling storage, and serverless option for unpredictable workloads.

### DynamoDB

> fully managed NoSQL

Key-value and document store with single-digit millisecond latency and global tables for multi-region replication.

## Caching & Queues

### ElastiCache

> managed Redis or Memcached

Session storage, caching, and pub/sub—perfect for Sidekiq (Rails) or BullMQ (Node) job queues.

### SQS (Simple Queue Service)

> fully managed message queues

Decouple services with standard or FIFO queues and dead-letter queues for failed messages.

### SNS (Simple Notification Service)

> pub/sub messaging

Fan-out events to Lambda, SQS, HTTP, or email—combine with SQS for reliable event-driven architectures.

## Networking & Content Delivery

### CloudFront

> global CDN

Cache assets at edge locations with S3/ALB integration, HTTPS, custom domains, and signed URLs.

### Route 53

> managed DNS

Domain registration with health checks, latency-based routing, and geolocation routing for global apps.

### VPC (Virtual Private Cloud)

> isolated network environment

Define subnets, route tables, security groups, and NAT gateways—every AWS resource lives inside a VPC.

### ALB (Application Load Balancer)

> HTTP/HTTPS load balancing

Path and host-based routing with native ECS/EKS/Lambda integration, TLS termination, and sticky sessions.

### API Gateway

> managed API layer

REST and WebSocket APIs with authentication, throttling, and caching—routes requests to Lambda, ECS, or any HTTP backend.

## Security & Identity

### IAM (Identity and Access Management)

> who can do what

Users, groups, roles, and policies following least privilege—service roles eliminate hardcoded credentials.

### Secrets Manager

> store and rotate secrets

Database passwords, API keys, and tokens with automatic rotation—SDKs fetch secrets at runtime.

### KMS (Key Management Service)

> encryption key management

Create and control encryption keys integrated with S3, RDS, EBS, and Lambda.

## Monitoring & Logging

### CloudWatch

> metrics, logs, and alarms

Collect logs, set threshold alarms, visualise dashboards, and query structured data with Logs Insights.

### X-Ray

> distributed tracing

Trace requests across microservices to identify latency bottlenecks and errors with automatic SDK instrumentation.

## CI/CD

### CodePipeline

> orchestrate release workflows

Source → Build → Test → Deploy pipeline integrated with GitHub, CodeBuild, and ECS/EKS.

### CodeBuild

> managed build service

Run containerised builds with Docker layer caching—pay per build minute, no Jenkins to maintain.
