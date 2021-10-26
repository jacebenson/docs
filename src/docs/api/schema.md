---
title: api/Table Schema
---

# Table Schema

The table schema is a defined... in a two places.  The Prisma schema file, and then in each schema definition language file.

- `./api/db/schema.prisma`
- `./api/src/graphql/user.sdl.js`

## Prisma Schema

The Prisma Schema file is where you would update the tables and columns on the database.  When you modify your schema, you will need to run `yarn rw prisma migrate dev` to promote those changes to the database.

You can interact directly with your database by running `yarn rw prisma studio` to see the data as it exists in your database.

## Schema Definition Language files

These files tie into the [GraphQL](/docs/api/graphql) schema.  You can scaffold out a schema definitions language file individually with the command `yarn rw g sdl <table_name>`.  

Schema Definition files have queries and mutations.  Those queries and mutations use functions defined in the [services](/docs/api/services) files.

Below is a SDL file query, and below that is the services file with it's appropriate function.

```js/6/
// api/src/graphql/user.sdl.js
export const schema = gql`
  type User {
    ...
  }
  type Query {
    users: [User!]! @requireAuth(roles: ["userRead", "admin"])
    user(id: Int!): User @requireAuth(roles: ["userRead", "admin"])
  }
  ...
`
```

```js/4/
// api/src/services/users.js
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const users = async () => {
  let records = await db.user.findMany({})
  return records
}
```