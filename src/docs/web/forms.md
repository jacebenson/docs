---
title: web/Forms
---

Forms are... complicated.  Lets just think about how complex forms are and where we are at.

## Forms

We have a shared component the [`<FormComponent />`](https://github.com/tskrio/tskr/blob/main/web/src/components/FormComponent/FormComponent.js) which works pretty good for what it is.  A starting point.  

Today the component works for both new and existing records.  It accepts url parameters to default values.  It even can show nice dropdowns for references.  

That being said there's a lot of room for improvement here.

### Props

There's a lot of `props` passed in to this component.  This should be cleaned up.

- `record` - This is the record the form will load, if this is included default values will load from that record.
- `fields` - This will control what fields to show and the order they show in. *When you scaffold, I include all the fields, but don't know the types, so it's up to you to set those.*
- `roles` - This *should* control what you can do like save and delete, however that's still in the works
- `onSubmit` - This was passed in to try to simplify the [Cells](/docs/web/cells) that call the component, but there's some confusion around this.  This should be removed from the component.
- `errors` - This controls what errors show up on the form and the fields.

### Fields

This `prop` specifically needs to be called out.  Today I've only coded for Text, TextArea, DateTime, and Password fields.

The field attributes you assign that are passed on the form are;

| Attribute        | Details |
| ---------------- | ------- |
| `name`           | the field name |
| `placeHolder`    | placeholder text |
| `required`       | if the field is required set this to true for client side check (doesn't work) |
| `prettyName`     | The Label to display for the field |
| `readOnly`       | if the field is readonly render it in a div and not an input |
| `type`           | default: `input`, accepts `password`, `select`, and `reference` |
| `value`          | used for `select`, and `reference` fields, controls the value for the options listed |
| `display`        | used for `select`, and `reference` fields, controls the display for the options listed |
| `defaultValue`   | used for all field types, should set the default value.  *reference* also needs `defaultDisplay` |
| `defaultDisplay` | used to build the display for a reference of the first choice. |
| `QUERY`          | Graphql to use for *reference* field lookup. |
| `choices`        | array for `select` type field |

A few examples of this in action is the [`NewUser.js`](https://github.com/tskrio/tskr/blob/main/web/src/components/User/NewUser/NewUser.js) and the [`EditGroupMemberCell.js`](https://github.com/tskrio/tskr/blob/main/web/src/components/User/EditGroupMemberCell/EditGroupMember.js) files.
### Setting values from the url

Below is how this was initially set up and is basically how it still works today, however you shouldn't need to mess with this code it might be helpful to see how it works.

You can assign a variable on a new form by passing it in the URL.