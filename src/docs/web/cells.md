---
title: "web/Cells"
---

## What are Cells?

> Cells are a declarative approach to data fetching and one of Redwood's signature modes of abstraction. By providing conventions around data fetching, Redwood can get in between the request and the response to do things like query optimization and more, all without you ever having to change your code.
>
> While it might seem like there's a lot of magic involved, all a Cell really does is execute a GraphQL query and manage its lifecycle. The idea is that, by exporting named constants that declare what you want your UI to look like throughout a query's lifecycle, Redwood can assemble these into a component template at build-time using a Babel plugin. All without you having to write a single line of imperative code! - <https://redwoodjs.com/docs/cells>

To be more specific, Cells are best used when dealing with the `useQuery` hook as noted on the [GraphQL page](/docs/api/graphql#client-side).

## What makes a Cell a Cell?

Components that end in `Cell` and exports a `QUERY` and **does not** have a default export, it will be treated as a cell.

<https://redwoodjs.com/docs/cells#how-does-redwood-know-a-cell-is-a-cell>

## Lets breakdown the Cell

Cells start with five constants; `QUERY`, `Loading`, `Empty`, `Failure`, and `Success`. There's two more that you can optionally add: `beforeQuery`, and `afterQuery`.

| Export        | Type               | Description                                                  |
| ------------- | ------------------ | ------------------------------------------------------------ |
| `QUERY`       | `string\|function` | The GraphQL query to execute.                                |
| `Loading`     | `string`           | If the request is in flight, render this component           |
| `Empty`       | `string`           | On successful response with no data, load this.              |
| `Failure`     | `string`           | On failure, load this.                                       |
| `Success`     | `string`           | On successful response with data, load this.                 |
| `beforeQuery` | `function`         | Lifecycle hook; prepares variables and options for the query |
| `afterQuery`  | `function`         | Lifecycle hook; sanitizes data returned from the query       |
