---
title: web/Forms
---

Forms are... complicated. Lets just think about how complex forms are and where we are at.  
We have the fields we want to display.  
The client side scripts we want to run.

We use a component for the form that takes a number of properties.
On the [cell](./cell.html) component load up `react-hook-form` render the form, and any child buttons.

The [`<FormComponent />`][formcomponent] loads the fields, and will render a submit button unless you
give it a children elements.

## Properties

There's a lot of `props` passed in to this component. This should be cleaned up.

| Property       | Expected Input               | Description                                                                                                                                                                |
| -------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `record`       | `{user}`                     | This is the record the form will load, if this is included default values will load from that record.                                                                      |
| `fields`       | `{fields}`                   | This will control what fields to show and the order they show in. _When you scaffold, I include all the fields, but don't know the types, so it's up to you to set those._ |
| `error`        | `{error}`                    | Error returned from GraphQL calls                                                                                                                                          |
| `onSubmit`     | `{onSubmit}`                 | The function to execute on submission of the form. If you need to convert a value from a string to a integer, this is where you should do that.                            |
| `handleSubmit` | `{handleSubmit}`             | Needed for react-hook-form to work.                                                                                                                                        |
| `register`     | `{register}`                 | Needed for react-hook-form to work.                                                                                                                                        |
| `formState`    | `{{ errors, isSubmitting }}` | Needed for react-hook-form to work.                                                                                                                                        |

## Fields

This `prop` specifically needs to be called out. Today I've only coded for Text, TextArea, DateTime, and Password fields.

The form can render the following field types.

The field attributes you assign that are passed on the form are;

| Field Type | Description         | Status      |
| ---------- | ------------------- | ----------- |
| text       | Default             | Implemented |
| password   |                     | Implemented |
| reference  | Loads a selectbox   | Implemented |
| select     | Select input        | Implemented |
| textarea   | Textarea input      | Coming      |
| checkbox   | Checkbox input      | Coming      |
| radio      | Radio input         | Coming      |
| date       | Date input          | Coming      |
| time       | Time input          | Coming      |
| datetime   | Date and Time input | Coming      |
| file       | File input          | Coming      |

| Attribute        | Details                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `name`           | the field name                                                                                  |
| `placeHolder`    | placeholder text                                                                                |
| `required`       | if the field is required set this to true for client side check (doesn't work)                  |
| `prettyName`     | The Label to display for the field                                                              |
| `readOnly`       | if the field is readonly render it in a div and not an input                                    |
| `type`           | default: `input`, accepts `password`, `select`, and `reference`                                 |
| `value`          | used for `select`, and `reference` fields, controls the value for the options listed            |
| `display`        | used for `select`, and `reference` fields, controls the display for the options listed          |
| `defaultValue`   | used for all field types, should set the default value. _reference_ also needs `defaultDisplay` |
| `defaultDisplay` | used to build the display for a reference of the first choice.                                  |
| `QUERY`          | Graphql to use for _reference_ field lookup.                                                    |
| `choices`        | array for `select` type field                                                                   |

`name`
`prettyName` = label
`placeholder` = placeholder
`required` = required
`minLength` = minLength

### Text

This is the default type of field. It will render an input field. Here's an example object that will render a text field.

```js
{
  name: 'firstName',
  prettyName: 'First Name',
  placeholder: 'First Name',
  required: true,
  minLength: 2,
}
```

### Password

```js
{
  name: 'password',
  prettyName: 'Password',
  placeholder: 'Password',
  required: true,
  minLength: 2,
  type: 'password',
}
```

### Reference

This loads two fields, one for a filter and another as a select box.

This takes a bunch of attributes on the field.

The normal props, name, prettyName, required, and minLength are applied like the other fields.

This takes a defaultValue, which is the value of the first choice in the select box.

This also takes these attributes:

| Attribute        | Notes                                                          |
| ---------------- | -------------------------------------------------------------- |
| `defaultDisplay` | The display value for the first choice in the select box.      |
| `defaultValue`   | The value for the first choice in the select box.              |
| `QUERY`          | The Graphql query to use to load the select box.               |
| `display`        | The field to display from the GraphQL model in the select box. |
| `value`          | The value to use from the GraphQL model in the select box.     |

An example object that will render a reference field.

```js
{
    name: 'user',
    prettyName: 'User',
    defaultValue: '',
    defaultDisplay: '',
    required: true,
    minLength: 2,
    QUERY: gql,
    display: 'field from model to display',
    value: 'field from model to use as value',

}
```

### Select

This is a select box. 

Example object that will render a select box.

```js
{
    name: 'roles',
    prettyName: 'Roles',
    required: true,
    minLength: 2,
    options: [ "array of options","to include" ],
    defaultOption: "default option"
}
```


[formcomponent]: https://github.com/tskrio/tskr/blob/main/web/src/components/FormComponent/FormComponent.js
