---
title: The Story About Points
description: Story points estimate effort, complexity, and size, not time, using Fibonacci numbers to prioritize tasks while maintaining team focus on value delivery  - summarized with AI.
published: 2022-06-17
tags: [scrum, story-points]
---

## Estimate in story points

Story points are used to represent the size, complexity, and effort needed for completing or implementing a user story. They based on skills and level of all team members, knowledge of the app etc.

Why just not measuring time?

> Story points reward team members for solving problems based on difficulty, not time spent. This keeps team members focused on shipping value, not spending time.

What can go wrong?

> Story points go wrong when they’re used to judge people, assign detailed timelines and resources, and when they’re mistaken for a measure of productivity. Instead, teams should use story points to understand the size of the work and the prioritization of the work.

### A few rules

- It's overall effort and effort doesn't equal time
- It's just estimation, it's ok to under- or over-estimate
- Involve everyone for better perspective (developers, designers, testers etc.)
- After every couple sprints re-calibrate capacity

### Sprint story points capacity

- It may take several sprints to average the capacity
- Staff changes in the team require re-averaging capacity
- On retrospective meetings check sprint capacity and re-calibrate if needed

### Fibonacci numbers as story points

1, 2, 3, 5, 8, 13, 21 ...

### Examples

> Note that `component` is used below as collection for frontend and backend things like React component, TypeScript/Ruby logic, API query/handler, databae query/handler, algorithm etc.

1 - Simple and short change. E.g. typo, comment something, switch some parameter.

2 - Add, edit or remove simple and reusable component. It's predictable - no side effects, no edge cases.

3 - It's like 2 but can be a few of components and some not exist or require easy refactor.

5 - Middle point in sprint capacity. Regular, predictable medium-sized task. Minor architectural changes.

8 - It's like 5 but can be not predictable. We know about some difficulties. E.g. extending some library for missing functionalities.

13 - The hardest regular task. E.g. research and write something yourself due to the fact that no known library handle it.

21 - If act as normal task it must be divided. E.g. difficult algorithm or major architectural changes.

#### By category:

> - Scale: `easy` < `medium` < `hard` < `unknown`
> - `easy/medium` means difficulty from easy to medium

|                            | 1      | 2      | 3      | 5           | 8           | 13          | 21           |
| -------------------------- | ------ | ------ | ------ | ----------- | ----------- | ----------- | ------------ |
| Side effects, edge cases   | -      | -      | easy   | easy/medium | medium      | medium/hard | hard/unknown |
| Impact on other components | -      | -      | easy   | easy/medium | medium      | medium/hard | hard/unknown |
| Algorithm                  | -      | -      | easy   | easy/medium | medium      | medium/hard | medium/hard  |
| Refactor                   | -      | -      | easy   | easy/medium | medium      | medium/hard | medium/hard  |
| Research                   | -      | -      | -      | easy        | easy/medium | easy/hard   | medium/hard  |
| Tests                      | easy   | easy   | easy   | easy/medium | easy/medium | easy/hard   | medium/hard  |
| Min. dev seniority         | junior | junior | junior | junior      | mid         | mid         | mid          |

## Rules for the number of tasks taken

At the same time, dev can work on **3 small** tasks.

Counting in tasks:

|                              | Tasks    |
| ---------------------------- | -------- |
| 1 code review of small task  | 1 small  |
| 1 code review of medium task | 2 small  |
| 1 code review of big task    | 3 small  |
| 2 small tasks                | 1 medium |
| 3 small tasks                | 1 big    |

Counting in story points:

| Tasks    | Story points |
| -------- | ------------ |
| 1 small  | 1 - 3        |
| 1 medium | 5 - 8        |
| 1 big    | 13 - 21      |
