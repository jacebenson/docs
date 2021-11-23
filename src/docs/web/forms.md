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
- `fields` - This will control what fields to show and the order they show in.
- `roles` - This *should* control what you can do like save and delete, however that's still in the works
- `onSave` - This was passed in to try to simplify the [Cells](/docs/web/cells) that call the component, but there's some confusion around this.  This should be removed from the component.
- `mutations` - This was being passed into the component to actuall allow the create, save, and deletes to occur in the component.  This should either be passed or not, and today it's mixed.

### Fields

This `prop` specifically needs to be called out.  Today I've only coded for Text, TextArea, DateTime, and Password fields.

The field attributes you assign that are passed on the form are;

- `name` - the field name
- `placeHolder` - placeholder text
- `required` - if the field is required set this to true for client side check (doesn't work)
- `prettyName` - The Label to display for the field
- `readOnly` - if the field is readonly render it in a div and not an input
- `type` - default: TextField, accepts `dateTime`, `password`, `textArea`, `reference`
- `value` - used for `reference` fields, controls the value for the options listed
- `display` - used for `reference` fields, controls the display for the options listed

A few examples of this in action is the [`NewUser.js`](https://github.com/tskrio/tskr/blob/main/web/src/components/User/NewUser/NewUser.js) and the [`EditUserCell.js`](https://github.com/tskrio/tskr/blob/main/web/src/components/User/EditUserCell/EditUserCell.js) files.
### Setting values from the url

Below is how this was initially set up and is basically how it still works today, however you shouldn't need to mess with this code it might be helpful to see how it works.

You can assign a variable on a new form by passing it in the URL.

```jsx/2-3,15/
const FormComponent = (props) => {
  const { search } = useLocation()
  let params = new URLSearchParams(search)
  //...
  return (<>
  <Label
    name="email"
    className="rw-label"
    errorClassName="rw-label rw-label-error"
  >
    Email
  </Label>
  <TextField
    name="email"
    defaultValue={props.user?.email || params.get('email')}
    className="rw-input"
    errorClassName="rw-input rw-input-error"
    config={{ required: true }}
  />
  </>)
}
```