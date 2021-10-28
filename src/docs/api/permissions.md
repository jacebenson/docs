---
title: api/Permissions
---

# Permissions

Permissions to any system can be broken down into three categories:

- Table level access
- Field level access
- Row level access

Setting up a method to manage access is key.

## Understanding Groups and Roles

In this system, a group is a collection of users, and roles.

The only way users have roles, is from the groups they belong to.

That being said, the roles I've created are actual table operations.

For each table (example User) there's four roles:

  - `userCreate`
  - `userRead`
  - `userUpdate`
  - `userDelete`

There is also one special role: `admin`.

The table roles are explcit.  If you have `userCreate`, you can create User records.  If you have `userRead`, you can read User records.  If you have `userUpdate`, you can update User records.  If you have `userDelete`, you can delete User records.

If you have `admin` you've got access to everything.

## Table level access

Table level access is a bit of a misnomer in this system.  It's actually query and mutation level access.  Because we're using [GraphQL](/api/docs/graphql) we can enforce users have a role to use those operations.

This is more complicated with [row level access](#row-level-access) as you might want the user to be able to edit their own record, but not anyone else.

### Securing the graphql schema

Back to table level access.  That is controlled on the `./api/src/graphql/*.sdl.js` files.  In the codebase on the `web` side there's a number of components where I show different things depending on the user's roles.

Here's an example of the `./api/src/graphql/user.sdl.js` file:

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
  //...
```

### Securing the routed pages

The `./web/src/Routes.js` file has all the routes your application has.  It also has a `Private` component.  This is another place that needs securing and you can see how it's done here.  Below is a modified version of the file to show how you can require auth for some pages, and different roles for others.

```js/12/
// ...
const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Set wrap={Standard}>
        <Route path="/logout" page={LogoutPage} name="logout" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/about" page={AboutPage} name="about" />
        <Private unauthenticated="home">
          <Set wrap={UsersLayout}>
            <Private unauthenticated="home" role={['admin', 'userCreate']}>
              <Route path="/users/new" page={UserNewUserPage} name="newUser" />
            </Private>
          </Set>
        </Private>
      </Set>
    </Router>
  )
}
```

### Securing components

Table and field level access should be used to also control how componentes render.  If you don't have read access to one field, you should omit it from your component.  If you don't have access to read a table you should omit it as well.

To secure those the code is the same.  An example would be how I'm only showing Group Roles to `groupRoleRead` and `admin`.  

On `./web/src/components/GroupCell/GroupCell.js` the code is as such.

```js/6-8/
export const Success = ({ group }) => {
  const { hasRole } = useAuth()
  return (
    <>
      <Group group={group} />
      <GroupMembersByGroupCell groupID={group} />
      {hasRole(['groupRoleRead', 'admin']) && (
        <GroupRolesByGroupCell groupID={group} />
      )}
    </>
  )
}
```


## Field level access

Field level access is not much different from table level access.  You can't read a field if you don't have the role to read the table.  There is also the idea of *masking* a field.  We haven't set that up initially, but it's something that will be covered eventually.

If we wanted to restrict access to the `salt` field, we could do something like this in the `./api/src/graphql/user.sdl.js` file.

```js/9/
export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    name: String!
    preferences: JSON!
    hashedPassword: String!
    salt: String! @requireAuth(roles: ["admin"])
    GroupMember: [GroupMember]!
  }
  type Query {
    users: [User!]! @requireAuth(roles: ["userRead", "admin"])
    user(id: Int!): User @requireAuth(roles: ["userRead", "admin"])
  }
  //...
```

## Row level access

Row level access is something we're still figuring out.  I've been told this should live in the [services](/api/docs/services) files, but I haven't implemented this yet.  I also think there might be a solution with a directive.  



These group roles can be applied to a group, which is inherited by the group's members.  There are no user roles here.  If a user has the role, they can access the query, mutation, or field as described in the [schema](/docs/api/schema).


## Further Reading

There's more docs on this on Redwood's site.
- <https://redwoodjs.com/docs/redwood-router#private-routes>
- <https://redwoodjs.com/docs/directives>.
- <https://redwoodjs.com/cookbook/role-based-access-control-rbac>