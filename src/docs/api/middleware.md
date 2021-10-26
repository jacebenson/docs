---
title: api/Middleware
---

# Middleware

Middleware is a way to extend the functionality of the application.  If you wanted to make a REST call when a user updates their record, this is where you'd do that.

The middleware here is actually defined in the [services](/docs/api/services) files.  It read the content of the `./api/src/middlewares/` directory and loads them into the service so they can be executed.

Our middleware takes the input given by the GraphQL mutation or query, and does a Read on the database and merges them together so you have the full record to work with when writing your logic.

We have a special variable you can set on the incomingData object called `__error` which if present will surface the error to the user.