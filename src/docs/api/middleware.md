---
title: api/Middleware
---

# Middleware

Middleware is a way to extend the functionality of the application. If you wanted to make a REST call when a user updates their record, this is where you'd do that.

The middleware here is actually defined in the [services](/docs/api/services) files. It read the content of the `./api/src/middlewares/` directory and loads them into the service so they can be executed.

## Middleware Attributes
These middleware files have some important attributes.

- `active` - If this is set to `false`, the middleware will not be loaded.
- `order` - This is the order in which the middleware will be executed.
- `when` - This is an array of when e.g. `before`, or `after` the database call.
- `type` - This is the type or operation that the middleware is being executed for. e.g. `create`, `read`, `update`, `delete`.
- `command` - This is the code that is executed.


## Available data for middleware
In vague terms, the desire is to make the available options as simple as possible. In some cases some of the data is just not available.

For instance on create, there is no record, just the data. So we just pass your the data.

| Type   | When   | Data Available | Notes                                    |
| ------ | ------ | -------------- | ---------------------------------------- |
| create | before | form input     | `data` is the data from the form input.  |
| create | after  | record         | `record` is the record that was created. |
| read   | before | record         | `record` is the record that was read.    |
| read   | after  | record         | `record` is the record that was read.    |
| update | before | form input     | `data` is the data from the form input.  |
| update | after  | record         | `record` is the record that was updated. |
| delete | before | id of record   | id of the record to be deleted.          |
| delete | after  | id of record   | id of the record that was deleted.       |

On the before, if you need the full record before the database call, you can use the prisma client to read the data.  