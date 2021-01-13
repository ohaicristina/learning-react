# Controlled vs Uncontrolled Components

**In React**, the state lives in the components.
**In a form**, the state lives in the DOM

## Controlled Components

With React, you probably want the form state to live in the React component. This way, you can update the UI depending on the values of the form inputs

Example:

```JS
<input value={this.state.prop_value} onChange={this.handleChanges}></input>
```

## Uncontrolled Components

No component state, the form state lives in the DOM (input value)

Example:

```JS
// this.input = React.createRef('')

<input ref={this.input}></input>
// Uses the built in value attribute of an input
```

This way will work, but you have no way of updating the UI since React doesn't know what's going on (it's not handling the state)
