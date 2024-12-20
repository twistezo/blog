---
layout: post
title: target=_blank vulnerability
description: Reverse tabnabbing attacks exploit the target="_blank" attribute in links to redirect the parent tab to a phishing site  - summarized with AI.
date: 2021-04-28
tags: [browser, security]
categories: [programming]
---

# Prelude

Using web applications has become commonplace for the society. We deal with them every day. We can say that they surround us. We use them at work, for entertainment and as tools for communicating with others. Often, as users and even as developers, we do not realize how many security vulnerabilities in such applications are discovered every day.

The discussed vulnerability has been with us for a long time and due to its simplicity it is often underestimated or even unknown by some web application developers.

Almost every web application contains links that, when clicked, open in a new tab so as not to close the tab with the original page. This is a favorable behavior because the creators want the user to spend as much time in the application as possible.

An attack that exploits this vulnerability is so-called the "reverse tabnabbing". It is an attack where a page linked from the target page is able to replace that page for example with a phishing site.

# Attack scenario

1. Suppose the victim uses Facebook which was known for opening links via `target="_blank"`
2. Create a fake viral page
3. Create a phishing website that looks like Facebook sign in
4. Put below code on viral page e.g. via found XSS vulnerability
   ```
   window.opener.location = 'https://phishing-website/facebook.com';
   ```
5. The victim clicks on link on Facebook to the viral page
6. The viral page redirects the Facebook tab to the phishing website asking the user to sign in again

So we can change the parent tab from infected target page by `window` object from Web API. Typically, an attack involves using several found vulnerabilities and phishing scams in parallel.

# The problem

When we open a new tab in the browser using a link with the `target="_blank"` attribute, from the new tab we have access to our "referrer". Exactly to the `opener` property of the` Window` object, which returns a reference to the window that opened it, our parent page. This is due to the behavior of the `Window.open()` function. With access to this attribute we can easily replace our parent page. Note that some modern browsers can make `window.opener` function in target tab as `null` to prevent this behavior.

# Example code

```html
<a href="https://github.com" target="_blank">Go to GitHub - infected link</a>
```

```js
const link = document.getElementsByTagName("a");
if (link)
  link[0].onclick = () => {
    if (window) window.opener.location = "https://stackoverflow.com";
  };
```

Above is the infected link which originally opens a new tab with GitHub page but meanwhile it changes our "parent" page to Stackoverflow site.

# Live example

[https://codesandbox.io/s/targetblank-vulnerability-r8uij](https://codesandbox.io/s/targetblank-vulnerability-r8uij)

# Defense methods

1. HTML links

   Add `rel="noopener noreferrer"` to the `<a>` tag.

   The `rel` attribute defines the relationship between a linked resource and the current document.

   `noopener` tells the browser to navigate to the target without granting its access to the parent that opened it. Target tab `Window.opener` will be `null`.

   `noreferrer` prevents the browser, when navigating to target, to send parent address, or any other value, as referrer via the `referer` HTTP header. Note that this HTTP header name is intentional misspelling of "referrer".

2. JavaScript links

   For the JavaScript `Window.open `function you can add the values `noopener` and `noreferrer` in the `windowFeatures` parameter of the `Window.open` function but different browsers may respond differently so it is recommended to making `Window.opener` as `null` after using `Window.open()` function.
