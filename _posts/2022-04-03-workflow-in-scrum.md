---
layout: post
title: Scrum Workflow In A Nutshell
description: Daily meetings are led by the team leader to discuss progress, blockers, and code review, while the workflow involves task management from backlog to release  - summarized with AI.
date: 2022-04-03
tags: [scrum]
categories: [management]
---

# Daily meeting

Daily is usually led by the team leader. It is a good practice for the leader to share screen with a view of the current sprint. The daily meeting should be as short and concise as possible.

Each team member says what they did the previous day, what they will do today, and if they have any blockers. We move individual problems to which there is no quick answer to separate meetings.

We also check the status of the code review.

# Workflow in details

Here you will find a summary of what a typical workflow looks like from the customer, through the team, to its release. From the context of the programmer and the task.

Note that `[J]` is Jira and `[G]` is Git/GitHub related things.

1. [J] The customer requests a new feature
2. [J] PM adds Jira task with new feature to Backlog
3. [J] PM organizes Grooming meeting (Backlog refinement)

   Our task is one of next sprint goals.

   After meeting, the task:

   - is well discussed (user requirements, edge cases, impact)
   - has well-described technical details
   - is splitted into smaller ones (if big)
   - has a set priority and others Jira details e.g. epic, labels, version etc.
   - has estimation in story points (you can also estimate on planning, but after grooming we are more up to date)

4. [J] PM organizes Planning meeting

   If the task is missing grooming details, it goes back to the next grooming meeting.

   After meeting:

   - the task fits in next sprint's goal
   - the task's story points fits in next sprint time span
   - everyone understands the task (customer requirements, tech details etc.)

   If you have a short agenda, it is worth doing gromming and planning at one meeting.

5. [J] PM stars new sprint which includes the task

6. [J] PM or dev assigns the task and moves it to the `IN PROGRESS` column.

7. [G] Dev creates Git branch and Pull request on GitHub

8. [G] Dev finishes coding the task and commits changes

9. [G] Dev fills pull request, do self code review etc. and call others for review.

10. [J] Dev moves the task on Jira from `IN PROGRESS` to `CODE REVIEW` column.

    Simultaneously with the next steps, dev can take the next task from the `TODO` column himself or via PM.

11. [G] Code review is complete. Dev merges the task to the regular branch.

12. [G] Dev goes to the staging and checks how it works.

13. [J] Dev moves the task from `CODE REVIEW` to e.g. `STAGED` column.

14. [J] PM or other dev tests the task before release. Task is moved from `STAGED` to `IN TESTING` column.

    The tester writes in the task comment about it is being tested. He shouldn't have attributed himself to the task because we will lose the original author information.

    Regardless of the test effect, the tester leaves a positive or negative comment. It is also info about the end of testing.

    If positive, the task can be deployed.

    If not, it goes back to `IN PROGRESS` for fixes. This should be done by the task's original author.

15. [G] Authorized dev deploys the task to the production

16. [J] Dev moves the task from `STAGED` to `DONE`

17. [G] After the Continuous Delivery process, authorized dev goes to the production and check how it works.

18. [J] PM closes the sprint

19. [J] Sprint review & retrospective

    In the sprint review, we focus on the task in the context of the product. In sprint retrospective in the context of the process.

    Task is briefly reviewed. What difficulties did we encounter, what helped us, how can we overcome them in the future, how did it affect the whole etc.
