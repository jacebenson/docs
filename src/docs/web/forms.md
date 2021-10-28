---
title: api/Forms
---

You can assign a variable on a new form by passing it in the URL.

```jsx/2-3,15/
//...
const UserForm = (props) => {
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