---
layout: post
title: OWASP Top Ten - tldr;
date: 2024-01-29
tags: [security]
---

# OWASP Top Ten - tldr;

## Prelude

The OWASP (Open Web Application Security Project) foundation categorizes and describes threats and defense methods only once every few years. The following is based on the 2021 update - still valid in 2024.

## Categorized security risks

### Broken Access Control

Access via:

- privilege escalation
- metadata manipulation (e.g. JWT, cookies)
- URL/API request modifications

#### Defense

- correct authorization and session management
- security audits (access controls)

### Cryptographic Failures

Encryption vulnerabilities. Missing or old/weak alghoritms (e.g. MD5, SHA1).

#### Defense

- up-to-date and strong encryption
- avoiding old protocols (e.g. FTP, SMTP)

### Injection

Sending crafted data via input, URL or API - e.g. SQL, OS shell commands.

#### Defense

Input validation and sanitization, e.g. by escaping characters. Also on the server side before accessing to database.

### Insecure Design

Lack of thought about security throughout the entire application development process.

#### Defense

- segregation of layers based on risk
- develop with security specialists

### Security Misconfiguration

Incorrect configuration or use of default settings/passwords.

#### Defense

- continuous monitoring
- minimalism - KISS, DRY etc.

### Vulnerable and Outdated Components

Libraries, OS, cloud, Database.

#### Defense

- manually
- with scanners (e.g. GH Dependabot, npm audit)

### Identification and Authentication Failures

Incorrect authentication or session management.

#### Defense

- 2FA (Two-Factor Auth)
- strong passwords
- monitoring failed logins
- API resistant to ID enumeration

### Software and Data Integrity Failures

Malicious library code or unauthorized dev access.

#### Defense

- digital signatures (e.g. GPG on GitHub)
- manual library verification

### Security Logging and Monitoring Failures

No logs or monitoring of suspicious user activity.

#### Defense

- quality logs with context
- monitoring and warning mechanism

### Server-Side Request Forgery

Lack of verification of the correctness of the URL provided by the user when downloading the resource, e.g. from the server. You can access the network or file system.

#### Defense

- input cleaning and validation
- deny by default
- use positive list
