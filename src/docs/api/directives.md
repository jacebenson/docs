---
title: api/Table and Field Permissions aka Directives
---

# Directives

I've gone ahead and made the assumption that tables should have CRUD permissions.  So by default this starts with the following:

- userCreate
- userRead
- userUpdate
- userDelete
- groupCreate
- ...

These group roles can be applied to a group, which is inherited by the group's members.  There are no user roles here.  If a user has the role, they can access the query, mutation, or field as described in the [schema](/docs/api/schema).

## Table / aka Query Permissions

To apply a table permission to a table, you need to use the `@requireAuth(roles: ["userRead", "admin"])` directive.  This pretty much reads, "if the user has the userRead or admin role, they access the Query `users` or `user`.  If they don't, they don't access the query."  The same applies to the mutations near the bottom of this schema definition file.

```js/13-14/
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
    GroupMember: [GroupMember]!
  }
  type Query {
    users: [User!]! @requireAuth(roles: ["userRead", "admin"])
    user(id: Int!): User @requireAuth(roles: ["userRead", "admin"])
  }
  input CreateUserInput {
    email: String!
    name: String!
    preferences: JSON!
    hashedPassword: String!
    salt: String
  }
  input UpdateUserInput {
    email: String
    name: String
    preferences: JSON
    hashedPassword: String
    salt: String
  }
  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["userCreate"])
    updateUser(id: Int!, input: UpdateUserInput!): User @requireAuth(roles: ["userUpdate", "admin"])
    deleteUser(id: Int!): User! @requireAuth(roles: ["userDelete", "admin"])
  }
`
```

## Field Permissions

I haven't used these yet but if you wanted to store the answer to question for password resets maybe you'd have that as field on the User Table/Model like so.

```js/10/
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
    userVerificationAnswer: String! @requireAuth(roles: ["serviceDesk"])
    GroupMember: [GroupMember]!
  }
  type Query {
    users: [User!]! @requireAuth(roles: ["userRead", "admin"])
    user(id: Int!): User @requireAuth(roles: ["userRead", "admin"])
  }
  input CreateUserInput {
    email: String!
    name: String!
    preferences: JSON!
    hashedPassword: String!
    salt: String
  }
  input UpdateUserInput {
    email: String
    name: String
    preferences: JSON
    hashedPassword: String
    salt: String
  }
  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["userCreate"])
    updateUser(id: Int!, input: UpdateUserInput!): User @requireAuth(roles: ["userUpdate", "admin"])
    deleteUser(id: Int!): User! @requireAuth(roles: ["userDelete", "admin"])
  }
`
```

## Directives have one more trick, transformations

You might want to show some data to the user, but not the whole string.  Online we can see this frequently with credit card numbers.  With Directives you can create a transformation that applies to everyone except the roles indicated.  

Here's how that might look in the schema.

```js
type user {
  email: String! @maskedEmail(permittedRoles: ["admin"])
}
```

Here's how that would look in the directive file.

```js
import {
  createTransformerDirective,
  TransformerDirectiveFunc,
} from '@redwoodjs/graphql-server'

export const schema = gql`
  directive @maskedEmail on FIELD_DEFINITION
`

const transform: TransformerDirectiveFunc = ({ context, resolvedValue }) => {
  return resolvedValue.replace(/[a-zA-Z0-9]/i, '*')
}

const maskedEmail = createTransformerDirective(schema, transform)

export default maskedEmail
```

## Further Reading

There's more docs on this on Redwood's site here <https://redwoodjs.com/docs/directives>.