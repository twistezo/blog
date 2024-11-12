---
layout: post
title: Github - good practices about naming and pull requests
description: Naming conventions for branches, pull requests, and labels in Jira and GitHub, focusing on organization, clarity, and consistency in task management and collaboration  - summarized with AI.
date: 2021-12-02
tags: [git, github]
categories: [programming]
---

# Naming convention

Suppose we have a Jira project named `Foo`.

1. Repository and branch name we write in kebab-case. E.g. we named GitHub project `foo` and some branch `hot-fix-foo-112-add-bar`.

2. There are regular, working and feature branches.

   2.1. Regular branch

   Can be `development`, `staging`, `qa` etc. These are the branches that we merge pull requests into. Ideally, the name should correspond to the target environment.

   2.2. Working branch

   It's a branch where you do specific task. You can name it what you want because it's your work in progress but for the record, it's best to name it the same as your future pull request, using a kebab-case. E.g. `foo-207-remove-bar` or at least with task number like `foo-207`. This will make it easier to navigate between branches and between Jira and GitHub.

   Working branch also can can have more specific purpose like Bug Fix, Hot Fix, WIP (Work In Progress) etc. We can call them `bug-fix-foo-997-add-bar`, `hot-fix-foo-998`, `wip-foo-999` consecutively. As you can see, we only add the appropriate prefixes at the beginning.

   2.3. Feature branch

   When we have one large task, which we divided into smaller ones and distributed them in the team, we will first merge all minor changes into the feature branch, and this one to the regular branch.

   If we are working on a task that is part of a feature, then we should add feature name or feature name + number from Jira epic (feature), to the branch name. E.g. `foo-123-bar-456` where `foo-123` is the Jira epic task number and `bar-456` is a task from this feature.

   Branch name for whole feature will be e.g. `foo-123`.

3. Pull request

   Pull request name we write normal but with prefix from Jira task. E.g. our task has number `777` and title `Add bar and baz`. When we create pull request we should name it `Foo-777: Add bar and baz`. Thanks to this, we have an easy-to-find connection between Jira and GitHub.

   Pull request name, similar as working branch also can have specific purpose like Bug Fix etc. So we place this purpose in name prefix. Preferably in square brackets for better visibility between regular commits. E.g. `[HotFix] Foo-911: Remove bar`.

   3.1. Pull request label

   These labels should be named in kebab-case e.g. `bug`, `work-in-progress`, `release` etc.

   3.2. Labels vs prefixes

   Labels on GitHub pull requests list are easier to notice. On the other hand, when we use prefixes, GitHub for `Squash and merge` will get the commit name from pull request title, so it's convenient. It is up to you which one you will use. It is important that you use one of them.

# Pull requests

## Two approaches

1. You can create a pull request immediately after starting work on the task. Then you should assign it the label `work-in-progress`. You can also create `draft pull request`. On GitHub, this option is available when you expand `Create pull request` button. With draft you don't have to assign any labels. If you decide that the task is clean and finished, you can convert it into regular pull request.

2. You can create pull request only after completing the task.

Why is it good to create pull request immediately after starting a task? It happens that we do several tasks at the same time and return to them at different intervals. Thanks to the fact that we will immediately create pull requests for them:

- we have them labeled and organized in one place
- clear history of what we have done
- current status in relation to the target branch
- informations from CI processes, e.g. whether the tests pass successfully
- availability of all of the above to other developers

## Template

If we have a standardized description in every pull request, we are able to navigate through them easier and faster. So it is worth using pull request template.

Our pull request template you can find below. Use it in your project. After creating pull request, edit its description with paste your Jira project name into `PROJECT` placeholders and task number into `TASK_NUMBER` placeholders.

[Here](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) you will find how to add pull request template to repository.

In our template you will find a title that is an link to a broader or more business description on the Jira task. Description field should contain below informations. There is also checklist what we have to do before asking other developers for code review. At the end, you'll find a section where you can tell others how to test these changes.

```
# [PROJECT-TASK_NUMBER](https://FOO.atlassian.net/browse/PROJECT-TASK_NUMBER)

## Description

<!--
A simple and short explanation of what we can find in this PR.

- what to pay special attention to during code review
- what we have done additionally or what we have omitted
- why we made some unusual decision
  e.t.c.

Of course, only if this information is needed, otherwise we can leave it blank because a description from Jira is often sufficient.
-->

## Before code review

<!--
Delete things unrelated to your project.
-->

- [] I chose appropriate labels and I updated pull request description
- [] I updated my branch to target branch and I resolved all git conflicts
- [] I updated relevant docs, e.g. Changelog, Readme, API
- [] CI processes passed successfully
- [] I checked if it meets the basic objectives and it is not overly complicated
- [] I made sure it is easy to read, maintain and it is sufficiently tested
- [] I got rid of the liners warnings and I formatted the code
- [] The frontend or API was affected so I tested it in a browser or an API client

## How to test it?

<!--
If necessary, please describe how to test these changes, what to pay special attention to, and how to reproduce this case.
-->
```

## Labels

It's a good idea to use GitHub labels and divide your project into categories, components, functionalities etc. For example we can divide project into major functionalities and have labels like `orders`, `customers`, `payment` or divide into developers categories with labels like `frontend`, `backend`, `architecture` etc. The benefit is that it is easier for a reviewer to select the pull request to do code review based on his experience.

## Assignees

If you are the only developer in this pull request, you can leave this field blank which is by default. If you work with more people, each time a new person takes over the task, they should assign themselves to the `assignee` field.

## Merging

Always use `Squash and merge` option on GitHub or manually squash all commits before merging to main or feature branch. The advantage is that each task has single commit on the main branch.

This single commit should have the same message as pull request title. GitHub automatically takes pull request name when we click `Squash and merge`. Additionally, it will automatically copy the commit list from before the squash and paste it into the commit message. We should clear this commit list. We just need a title.

When we work with someone, git will put there an appropriate information such as `Co-authored-by: John <john@gmail.com>`. We leave this information. If there is more than one co-author, we leave them one below the other.

## Closing

Sometimes it happens that we do not want to complete or merge a finished task. Then we close pull request with the `Close pull request` button, adding a comment why we are doing it. A comment is essential.
