---
title: api/Rules
---

# Rules

Rules is a way to extend the functionality of the application. If you wanted to

- Make a REST call when a user updates their record
- Create a record on another table
- Abort the operation the user is attempting

Rules are where you'd do that.

> Disclaimer: This is a work in progress.  We recently pulled out of using Prisma Middleware as we couldn't raise errors to the user when we should in the middleware, so we went with a custom solution.  It's possible we move back to Prisma's middleware, but the code will only have slight changes then.

The rules are invoked on each [services](/docs/api/services) file. It read the content of the `./api/src/rules/<table>/*.js` directory and loads them into the service so they can be executed.

## Rules Attributes
These middleware files have some important attributes.

- `active` - If this is set to `false`, the rule will not be loaded.
- `order` - This is the order in which the rule will be executed.
- `when` - This is an array of when e.g. `before`, or `after` the database call.
- `type` - This is the type or operation that the rule is being executed for. e.g. `create`, `read`, `update`, `delete`.
- `command` - This is the code that is executed.
- `title` - This is the title of the rule, used for logging.
- `file` - This is the file name of the rule. (default is `__filename`) this may be used for reducing the code in the services eventually.


## Available data for rule
In vague terms, the desire is to make the available options as simple as possible. In some cases some of the data is just not available.

For instance on create, there is no record, just the data. So we just pass your the data.

| Type   | When   | Data Available | Notes                                    |
| ------ | ------ | -------------- | ---------------------------------------- |
| create | before | form input     | `data` is the data from the form input.  |
| create | after  | form input     | `data` is the data from the form input.  |
| read   | before | record         | `record` is the record that was read.    |
| read   | after  | record         | `record` is the record that was read.    |
| update | before | form input     | `data` is the data from the form input.  |
| update | after  | form input     | `data` is the data from the form input.  |
| delete | before | id of record   | `id` of the record to be deleted.          |
| delete | after  | id of record   | `id` of the record that was deleted.       |

On the before, if you need the full record before the database call, you can use the prisma client to read the data.  