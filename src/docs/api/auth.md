---
title: api/Authentication
---

# Authentication

## How does the authentication work?

It works with the [dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup) set up.  So there is no other system for authentication.  You can change that if you want to, but the default here is dbAuth.

> dbAuth relies on good ol' fashioned cookies to determine whether a user is logged in or not. On an attempted login, a serverless function on the api-side checks whether a user exists with the given username (internally, dbAuth refers to this field as username but you can use anything you want, like an email address). If a user with that username is found, does their salted and hashed password match the one in the database?
>
> If so, an HttpOnly, Secure, SameSite cookie (dbAuth calls this the "session cookie") is sent back to the browser containing the ID of the user. The content of the cookie is a simple string, but AES encrypted with a secret key (more on that later).
> 
> When the user makes a GraphQL call, we decrypt the cookie and make sure that the user ID contained within still exists in the database. If so, the request is allowed to proceed.
> 
> If there are any shenanigans detected (the cookie can't be decrypted properly, or the user ID found in the cookie does not exist in the database) the user is immediately logged out by expiring the session cookie.

## How can I change the authentication system?

You would need to just change the `./App.js` file to use the appropriate authentication system.  It would require some work but it's not impossible.  See <https://redwoodjs.com/docs/authentication> for more details.