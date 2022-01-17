---
title: "web/Lists ~ Tables"
---
A better title might be tables.  

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
- `count` - used to display the number of results
- `enableSearch` - controls if the search field is on the page
- `table` - used to read the logged in users
- `setSearchInput` - function used to update the search input for current list
- `searchInput` - the search input for the current list

## Search / Filtering

Search works but still needs improvement at the query it shows is rough.  The search box will search fields defined in the `service` file.

## Pagination

We have pagination, but like search it could be improved.
## Sort (click the heading of a column)

This is all set and is working.

## Limit

This works

## Header actions

This works, to sort columns that allow it and weather or not the column is displayed.

## Cell actions

This works, to build filters, and copy data.