---
title: Add calculated fields
---

Calculated fields are fields that are calculated from other fields.

There's no reason to add calculated fields to the actual database.  Just add it to the service, and sdl.js files.

You can add these fields to the `./api/src/services/*.js` files where appropriate.

The example I came across would be if you wanted to know how long it's been since something's been updated.

```js/10/
// api/src/services/task/task.js

import { db } from 'src/lib/db'

export const tasks = () => {
  return db.user.findMany()
}

export const Users = {
    GroupMember: (_obj, { root }) => db.user.findUnique({ where: { id: root.id } }).GroupMember(),
    ageInDays: (_args, { root }) => Math.floor((new Date() - root.createdAt) / (1000 * 60 * 60 * 24)),
}
```

```js/11/
// api/src/grahphql/user/user.sdl.js
export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    name: String!
    preferences: JSON!
    hashedPassword: String!
    salt: String!
    ageInDays: Int!
    GroupMember: [GroupMember]!
  }
```