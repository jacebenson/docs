---
title: "web/Lists ~ Tables"
---
A better title might be tables.  

Tskr uses [react-table](https://react-table.tanstack.com/docs) to organize the data in lists or tables.

The [TableComponent](https://github.com/tskrio/tskr/blob/main/web/src/components/TableComponent/TableComponent.js) takes a number of `props` and then passes that data into react-table.

## Props

- `title` - The title on the list
- `columns` - The columns to include
- `data` - The data to present
- `queries` - Includes the `DELETEMUTATION` to allow deletes from the list, and the `QUERY` for refetching but that doesn't seem to work yet.
- `routes` - Determines where you go when you click on `New Record`, and `Edit`
- `display` - Controls what is displayed as the `title` attribute of `New Record` and `Edit`.  This is seen as a hoverover now.
- `roles` - Controls what buttons you see depending on the `deleteRecord`, `createRecord`, `editRecord` roles defined.
- `queryVariables` - Not used as it depends on `QUERY` working with refetches.

## Search / Filtering

This is placeholder html at the moment.  Search has not been added yet.

Search will use [`useGlobalFilter`](https://react-table.tanstack.com/docs/api/useGlobalFilter) as it can span many columns.

Column level filtering will use [`useFilter`](https://react-table.tanstack.com/docs/api/useFilters).

You can see an example of it working [here](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/filtering)

## Pagination

This is placeholder html at the moment.  Pagination has not been added yet.

[Example](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/pagination)

[`usePagination`](https://react-table.tanstack.com/docs/api/usePagination)

## Sort (click the heading of a column)

This is all set and is working.
