---
title: "api/GraphQL"
---

# GraphQL

GraphQL is a fundamental part of RedwoodJS.

RedwoodJS gives us lots for free and we're just taking them with it.  

It would be wise to read-up on it from the source on <https://graphql.org/learn/>.

That being said, we have a few things to note.

## The GraphQL Schema Definitions

There's more details about this on the [Table Schema](/docs/api/schema/#schema-definition-language-files)

## Client Side

[Apollo](https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component) is used on the `./web/src/App.js` file.

If you need to make a query, the recommendation is to use a [cell](/docs/api/cell) to do so.

If you're making a mutation, [Apollo's useMutation](https://www.apollographql.com/docs/react/api/react/hooks/#usemutation) is used for that.

Here's a list of the hooks that are available:

| Hook | Comment |
| ---- | ------- |
| [`useQuery`](https://www.apollographql.com/docs/react/api/react/hooks/#usequery) | If you're going to use this, you should use a [cell](/docs/api/cell). |
| [`useMutation`](https://www.apollographql.com/docs/react/api/react/hooks/#usemutation) | This is the way to modify data. |
| [`useSubscription`](https://www.apollographql.com/docs/react/api/react/hooks/#usesubscription) | Unless you're running you're app on a server, this won't be available to you as you are only running on serverless functions limited to ~10 seconds |
| [`useLazyQuery`](https://www.apollographql.com/docs/react/api/react/hooks/#uselazyquery) | Execute queries in response to events other than component rendering |


## Server Side

Normally when you need to define a GraphQL server there's loads of things to set up.  With RedwoodJS (and also Tskr) all you need to set up is the [GraphQL Schema](/docs/api/schema) and the [Services](/docs/api/services).

### Default Resolvers

> According to the spec, for every field in your sdl, there has to be a resolver in your Services. But you'll usually see fewer resolvers in your Services than you technically should. And that's because if you don't define a resolver, Apollo Server will.
> RedwoodJS - <https://redwoodjs.com/docs/graphql#server-side>

The TL;DR version is, so long as you're [table schema](/docs/api/schema) is defined with the columns and types, and the graphql schema is defined with the fields that match the names, you'll be fine.  

If you want to be explicit and define the resolvers, at the bottom of your `./api/src/services/*.js` file you can do tha.  It would look like this.

```js/9-11/
// api/src/services/user/user.js

import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const Users = {
  id: (_args, { root }) => root.id,
  email: (_args, { root }) => root.email,
  name: (_args, { root }) => root.name,
}
```

You may even want to do this for custom fields where data can be derived.  Maybe you wanted to add `age` to the above example.
```js
age: (_args, { root }) => new Date().getFullYear() - root.birthDate.getFullYear()
```

### Redwood's Resolvers Arguments

> According to the spec, resolvers take four arguments: args, obj, context, and info. In Redwood, resolvers do take these four arguments, but what they're named and how they're passed to resolvers is slightly different:
> 
> - args is passed as the first argument
> - obj is named root (all the rest keep their names)
> - root, context, and info are wrapped into an object; this object is passed as the second argument
>
> RedwoodJS - <https://redwoodjs.com/docs/graphql#redwoods-resolver-args>

### Context

In Tskr, the `context` is available to any server if you import the `@redwoodjs/graphql-server` package.

`context` is read-only in your services.  You can change it but only in the `createGraphQLHandler`.  <https://redwoodjs.com/docs/graphql#how-to-modify-the-context>

### Health checks

Do you want to see if your server is up and running?  You can do that with the `/graphql/health` query.
## Further Reading

<https://redwoodjs.com/docs/graphql>