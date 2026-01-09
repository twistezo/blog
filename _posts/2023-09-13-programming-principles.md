---
layout: post
title: Programming principles in a nutshell
description: Programming principles like SOLID, DRY, KISS, and YAGNI focus on simplicity, modularity, and adaptability, emphasizing low dependencies and efficient design  - summarized with AI.
date: 2023-09-13
tags: [clean-code, principles]
categories: [programming]
---

# Keep in mind

- they are not tied to a specific language or technology
- don't memorize them
- use wisely, they don't fit everywhere
- they are very universal (single function, whole architecture, database/API, drivers/interfaces)
- "interface" could mean like from Java language or from the printer's driver (doesn't matter)

# SOLID

- S - SRP - Single Responsibility Principle

  > one responsibility

- O - OCP - Open-closed Principle

  > expandable without modification

- L - LSP - Liskov Substitution Principle

  > while extending, keep or extend the interface

- I - ISP - Interface segregation Principle

  > dedicated are better than generic

- D - DIP - Dependency inversion Principle

  > high-level things can't depend on those at low-level

# LC & HC

- Loose coupling

  > unrelated elements should have as few dependencies as possible

- High cohesion

  > related elements should be close to each other

# DI & IoC

- Depencendy Injection

  > accept instances of others rather than creating them within

- Inversion Of Control

  > do not create dependencies, accept them (DI); delegation of events instead of sequences

# Last but not least

- DRY - Don't Repeat Yourself

  > divide and conquer - refactor

- KISS - Keep It Simple Stupid

  > don't overengineer - use basics

- YAGNI - You Aren't Gonna Need It

  > requirements are always changing
