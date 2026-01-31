---
title: What Should Good Project Documentation Look Like?
description: Well-documented projects improve code development, team collaboration, onboarding, and communication. Documentation types include text, diagrams, and code comments  - summarized with AI.
published: 2021-08-22
tags: [documentation, scrum]
---

## What will we gain from a well-documented project?

The purpose of creating good project documentation is:

- More efficient code development and maintenance

  We often build on existing functionalities. Usually we first need to read and understand the code of the existing functionality before we can build something new. It can takes a long time. Well-documented code can significantly shorten this process.

- Easier team collaboration between different positions

  In a typical scrum team, we usually have people who deal with various things, e.g. Front-end developer, Back-end developer, UI/UX designer, Product Owner etc. Well-documented individual parts of the project improve communication between team members. For example, a front-end developer, having access to the documentation of the back-end part of the application, is able to quickly and efficiently obtain the necessary information without the involvement of other people.

- Quicker onboarding of new people and easier rotation within the team

  If the project is well documented, we are able to quickly introduce new employees who have not had contact with the technologies we use before. We can even faster rotate employees in a team or company who have more knowledge about the technologies used, but less about the project itself. Ultimately, we can reduce the number of meetings and people involved in the onboarding.

- Easier communication with the customer

  Having easy access to clear and concise documentation and having a history of changes to these documents, communication with the customer becomes more effective.

## Forms of documentation

Documentation can take many forms. It can be:

- text sheet
- spreadsheet
- block diagram
- code comment
- mockup
- video

## What should good project documentation look like?

### Main doc - all information available from one place

It is worth choosing one place and try to put as much documentation as possible in it. If the documentation is distributed we try to keep references to the distributed elements. For example, place for main document can be the file README.md and the Wiki section on GitHub or Atlassian Confluence.

The main document should contain a short description of what the project is, what its purpose is and what phase it is in (e.g. maintenance, active).

Ideally, the main document should be kept in the main readme of the project on GitHub.

At the top of the project's readme on GitHub there should be a badge bar with the most important CI/CD statuses, library versions, supported OSs, project status etc. Generally, the point is to easily find out what we are dealing with in this project.

The order of information, links and chapters should be the same as in this document, i.e. the main document, badges bar, project description, scrum process and workflow, etc.

Main doc should have table of contents.

Template in markdown:

```
<div align="center">

# Foo

</div>

<div align="center">

![](https://img.shields.io/badge/status-maintenance-orange?style=flat-square)
![](https://img.shields.io/badge/license-MIT-lightblue?style=flat-square)
![](https://img.shields.io/badge/platform-MacOS_|_Linux_|_dockerized-lightblue?style=flat-square)
![](https://img.shields.io/badge/arch-x64_|_arm64-lightblue?style=flat-square)
![](https://img.shields.io/badge/fe-Typescript_v4_|_React_v18-lightblue?style=flat-square)
![](https://img.shields.io/badge/be-Ruby_v3_|_Rails_v7-lightblue?style=flat-square)
![](https://img.shields.io/badge/db-Postgres_v14-lightblue?style=flat-square)
![](https://img.shields.io/badge/api-GraphQL-lightblue?style=flat-square)
![](https://img.shields.io/badge/host-AWS-lightblue?style=flat-square)

</div>

_Generate badges on https://shields.io/. Use `style=flat-square`.

<table>
  <tr>
    <th>Environment</th>
    <th>CI/CD status</th>
  </tr>
  <tr>
    <td>Staging</td>
<td>

<img height="18" src="https://circleci.com/docs/blog/docs/svg-passed.png">

</td>
  </tr>
  <tr>
    <td>Production</td>
<td>

<img height="18" src="https://circleci.com/docs/blog/docs/svg-passed.png">

</td>
  </tr>
</table>

_Generate CircleCI badges on https://circleci.com/docs/2.0/status-badges/. Note that table is only example. Form of presentation is up to you._

## About

A short description of what the project is, what its purpose is and what phase it is in etc.

## Table of Contents

1. [Business domain](#business-domain)
2. <-- rest of chapters -->
3. [Code](#code)
4. [Other stuff](#other-stuff)

## <-- Here should be all chapters from Business domain to Code -->

All chapter should be H2 header e.g. `## Business Domain`

## Other stuff
```

### Various types of documentation

More complex projects due to different roles in the team may require documentation appropriate for their area.

Documentation may be broken down into:

- Scrum process and workflow (Project Leader/Scrum Master)
- Business domain (Product Owner)
- Interface and user experience (UI/UX)
- Architecture (Developers)
- Databases (Developers)
- API (Developers)
- CI/CD (Developers)
- Cloud architecture (Developers)
- Error reporting (Developers, Users)
- Setting up the project (Developers)
- Code (Developers)

We try to arrange the documentation so that each area is easily accessible and understandable for each role in the team and people outside the project.

**The documentation for all below parts, should contain a brief description and if necessary reasons for the decisions made.**

### Business domain

When creating business documentation, it is worth choosing tools that have the following features:

- simplicity of text creation and data presentation
- collaborating
- revision history
- easy sharing

The recommended tools are Google Docs and Atlassian Confluence.

The business domain description should contain all necessary information for the team members and the customer to understand the project:

- short introduction and description of the whole
- the purpose of the project
- arrangements with the customer (if necessary)
- project roadmap (link from Jira, Productboard etc.)
- all necessary information about business domain

### Team

All roles and responsibilities in the team should be written down, preferably to our main document.

There is a global document in which we keep information about teams, their connections and people that may be helpful when working on a the project.

Example:

```
Team

John Smith
- Senior Backend developer (Ruby/RoR, databases, AWS, CI/CD)
- Project leader (Daily meeting, Grooming, Retrospective)
- Technical support for Product Owner at the customer
```

The recommended tools are Google Docs, Google Spreadsheets and GitHub (Readme, Wiki).

### Scrum process

The scrum process used in the project should be written down, preferably to our main document.

Example:

```
Scrum process

- Sprint - 2-3 weeks long
- Daily meeting - every 1 day
- Planning - every 2 weeks
- Grooming - every 1 week
- Retrospective - every 2 weeks
```

The recommended tools are Google Docs and GitHub (Readme, Wiki).

### Workflow

The workflow should be written down, preferably to our main document.

Example:

```
Workflow

Jira
- IN TESTING column
  - Pick some STAGED task
  - Check its description and requirements
  - Test its on staging
  - If positive, move to DONE
  - If negative, leave comment and tell author


GitHub
- Code review
  - 2 approves
  - CI status checks
```

The recommended tools are Google Docs and GitHub (Readme, Wiki).

### Communication in the project

It is worth knowing what tools we use to communicate in the team or outside of it in the project. These can be slack channels, developer test accounts, team emails, number to customer phone etc.

Example:

```
Common accounts:
1. Staging test user
    login: john@gmail.com
    password: smith

Slack channels:
- #foo-devs
- #foo-notifications
- #foo-business

E-mails:
- our-customer@gmail.com
- our-product-owner-leader@gmail.com

Phones for urgent situations:
- 777 888 999 - John Smith - Product Owner
```

### Interface and user experience

It is worth creating a text document that will help you understand the decisions made at the planning stage, the way you work, how the mock-ups are cataloged, how to cooperate and how we version changes. What resolutions does the application support, is it responsive, do we have a mobile version or support the disabled, etc.

If we conduct research on users, it should also be mentioned in the documentation with references.

When creating UI/UX documentation, it is worth choosing tools that have the following features:

- preview of created mockups
- collaborating
- rapid prototyping
- cataloging
- reusable components
- revision history
- easy sharing

The recommended tools are Figma and Adobe XD.

### Architecture

If the architecture is distributed or complex, the documentation should be broader and preferably as block diagrams. We need a clear understanding of the information flow, the connections between the various components, the tools and technologies used.

### Databases

A brief description of the databases used. Description or diagram of connections between the bases or their elements. Ability to generate documentation or database schema.

### API

We should be able to generate API documentation to a clear and readable form. For this purpose, you can use, for example the Swagger UI, Postman or similar tool, which is sometimes built into individual libraries. Documentation should be generated in such a way that reading it does not force you to go deep into other technologies. In other words, API documentation should be exposed externally.

### CI and CD

Description or block diagram of CI/CD processes in our project and the environments we use (e.g. staging, production). Well documented configuration files for the tools used, e.g. CircleCI, Terraform.

In the Continuous Integration process, we should focus on the description of the building process depending on the environment, testing (e.g. unit tests, integration tests, E2E) and merging changes to the application and its individual components.

In the Continuous Delivery process, we should focus on the description of the deliver or its individual components to appropriate environments that are located, for example, on the AWS cloud.

### Cloud architecture

If our application is hosted on one of the popular clouds, e.g. AWS, we include this information in the main document. We include information on the functionalities we use (e.g. RDS, ECS, ECR), a description of the cloud architecture, our hosting flow, maintenance information and all the other without which we are unable to work.

### Error reporting

Each project at some stage should have error reporting system. We most often use external tools such as Rollbar, Sentry, etc. The main document should contain information about the tool and its functionalities we use for reporting. Information whether we send error notifications from various environments, e.g. to e-mail, Slack channel.

As for errors related to the use of the application, we add information about the path of reporting such an error by the developer or the end user.

### Setting up the project

For the convenience of developers and smooth processes in the company, each project should strive to set up the entire development environment with one click, which allows you to start working immediately.

A popular solution to this problem is containerization of the project with Docker or if the application is distributed then Docker Compose. An additional advantage of this solution is that the whole thing works independently of the environment of a given developer, eg OS.

If project uses multiple environments, it likely contains ENV files. For security reasons, the project may also need to provide other files that contain sensitive data needed to run it locally. We need information on what files these are and from whom we will get them.

### Code

The basic principle of documenting code is writing it in such a way that it does not require documentation. The so-called self-commenting code. In other words, we write the code in such a way that the person reading it, who does not know the logic of a given functionality, immediately knows what is going on.

Sometimes, however, we need to leave information in the code related to the business domain, the intricate logic of a given functionality or a complicated algorithm. We are not afraid to do this.

When we create a functionality or a library that will be used by others, we try to pay special attention to whether the exposed interfaces will be understandable to the recipient.

There are ready-made solutions for generating documentation for popular programming languages. Documentation can be generated as a website, to a PDF file, etc. Many IDEs have built-in comment syntax highlighting. For example, the JSDoc library is a popular solution for JavaScript.

## Do not exaggerate with the documentation

When creating documentation, it is easy to overdo the amount of information. Only those things that may not be obvious to others should be documented. Only those things that will improve processes important for our project and company. You should limit the amount of information. Write briefly, clearly and concisely.

## Maintaining documentation

Team members rotate and learn new skills. The client comes up with new functionalities and changes the current ones. The project is developing and living its own life. It is extremely important to motivate and maintain the existing documentation. Each role in the team should take care of its part of the documentation.

The current documentation should be reviewed every now and then. Consider whether the current requirements and tools are still meeting their original goals. Don't be afraid to make costly changes. After a thorough analysis, it is often worth spending more time on some drastic change in the documentation, e.g. transferring it to another tool, because it can quickly pay off in the near future when it comes to maintaining documentation and project management.

## How to evaluate project documentation

To make the assessment of the documentation of each project consistent, follow the tips below.

1. Organize a meeting with people responsible for the project and, if necessary, with people responsible for the areas.
2. Go through the entire document together.
3. For each chapter, pay attention to whether the documentation meets the requirements in terms of place, tools and general requirements.

Keep in mind that the place should align with the rest of the distributed docc, the tools with the others, and the requirements with the best practices and guidelines.

## Examples

1. Popular GitHub readme templates - [https://www.readme-templates.com](https://www.readme-templates.com)
2. All about GitHub readme. Examples, tools, guides - [https://github.com/matiassingers/awesome-readme](https://github.com/matiassingers/awesome-readme)
3. Examples of good documentation in various forms:
   - [https://github.com/angular](https://github.com/angular)
   - [https://github.com/google](https://github.com/google)
   - [https://github.com/microsoft](https://github.com/microsoft)
