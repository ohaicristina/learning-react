# Validating Prop Types

- by default, props are optional
  - i beleive this is the opposite of using typescript where the props are required unless otherwise specified
- JS has a baked in way of type checking (lighter weight than typescript)
- includes: boolean, null, undefined, number, string, symbol, object
- need to install the `prop-types` npm package

## How to Add Prop Types to a component

- a component gets a `propTypes` property which is an object containing key/values
  - keys = props the component accepts
  - value = the data type for the props
- if a prop that doesn't match the assigned data type is passed to the component, you'll get a warning

Example:

```JS
Hello.propTypes = { // static property added to the component
    name: PropTypes.string.isRequired
    // PropTypes = object imported from the prop types package
    // string = prop type
    // isRequired = if 'name' is not included then the error is shown
}
```

## Prop Types API

- **any:** don't use, neglects benefits of propTypes
- **arrayOf:** assigns a type to an array (ex: an array of strings -> `arrayOf(PropType.string)`)
- **array:** must be an array
- **bool:** must be a boolean
- **element:** must be a react element
- **exact:** must be an object with a specific shape
- **func:** must be a function
- **instanceOf:** instance of a certain class (ex: `PropTypes.instanceOf(user)`)
- **number:** must be a number
- **object:** must be an object
- **objectOf:** must be an object with all of the same type of values
- **oneOf:** must be one of a certain value (like enums with TS?)
- **oneOfType:** must be one of two or more types
- **shape:** must be a certain shape. like 'exact' but lets you add additional propertyies if needed
- **string:** must be a string
- **symbol:** must be a symbol
