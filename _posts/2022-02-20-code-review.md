---
layout: post
title: The right way to review code
date: 2022-02-20
tags: [git, github, code-review]
---

# The right way to review code

## Author

Before you ask others for code review, create pull request properly, check everything in general to save others time and firstly do a self code review.

```
- [x] I chose appropriate labels and I updated pull request description
- [x] I updated my branch to target branch and I resolved all git conflicts
- [x] I updated relevant docs, e.g. Changelog, Readme, API
- [x] CI processes passed successfully
- [x] I checked if it meets the basic objectives and it is not overly complicated
- [x] I made sure it is easy to read, maintain and it is sufficiently tested
- [x] I got rid of the liners warnings and I formatted the code
- [x] The frontend or API was affected so I tested it in a browser or an API client
```

If we are working on a large task, it is worth doing a self code review every few commits, e.g. milestones, so that we do not have to review the whole changes at the end when we can be no longer up to date with that code.

Before asking the others for code review, it's a good to squash all commits into one. Thanks to this, we will have a short and clear history of changes during code review. This will facilitate the reviewer's work when he checks the fixes made.

## Reviewer

It is important to assign itself to pull request _assingess_ field. This allows the author to know that someone starts reviewing his code and will not make any changes during this time.

As a reviewer do a few passes. When there are serious problems in a given pass, we abandon checking the next ones until the author fixes them.

### The first pass

Check the general things

- The correctness of pull request itself (labels, description, comments)
- Documentation coverage (Changelog, Readme, API)
- Does CI processes passed successfully? (linters, tests, app build)
- Update to target branch, proper target branch and conflicts

### The second pass

Check the functionality itself

- Does the functionality really work? In a browser, console, API client etc.
- Does the functionality meet its basic objectives?
- Isn't the solution overcomplicated?
- Has anything been added beyond the requirements?
- Attempt to break functionality and check if it supports all known edge cases

### The third pass

Check the implementation

- Correct implementation of functionality in accordance with the second review pass
- The implementation meets commonly used good practices and design patterns
- The naming of functions, variables, API endpoints, etc. is simple, precise and conforms to the convention
- Pay attention to the file structure
- Think about the security and resource efficiency of the solution
- Note the simplicity of maintaining the implementation
- Has the code been cleaned up? E.g. unnecessary comments, unused fragments
- Check whether there is a need to divide the implementation into separate pull requests
- Does the code require a refactor?
- Any warnings or errors from linters or app?
- Code formatting
- Did the code require documentation? If so, is it well documented?

### The extra pass

The extra pass is optional but strongly suggested. Finally, we can think about and propose a better, lighter, less resource-hungry or simpler solution to the problem. We can suggest a better naming convention, file structure, some design patterns or better libraries.

Generally speaking, consider the possibilities of improving the current code in terms of maintenance. It should be remembered that these are voluntary proposals, and the issue of their implementation should be agreed with the team so as not to unnecessarily extend the time of work on the task.

Depending on the experience level of the author and reviewer, this is the time and place to learn by reviewing the code.

## Golden rules

1. Be nice and understanding
2. Before you ask for review be sure that you

   - have finished everything
   - have completed _Before code review_ checklist
   - did a decent self code review

3. As an author, do not add any new changes while the code is reviewing
4. Do not use any force push from the moment someone is asked for code review
5. Push well-described fixes
6. If someone has doubts as to how a given piece of code works, it is not enough to answer them. You should rewrite the code so that there are no such questions or if it is not possible, it should be properly documented.
7. Always reply to comments. If any issue has been agreed outside of GitHub, please leave a relevant comment.
8. Minimize lag between rounds of review
9. Don't pick on unimportant details
10. Don't be afraid of the _Request changes_ button as reviewer
11. As an reviewer, always do the second round if code review was commented or rejected, don't accept blindly

How to point out mistakes and at the same time not make the author feel personally attacked?

- Write culturally
- Use a plural
- Praise good changes
- Make a solid justification
- Don't dig unnecessarily
