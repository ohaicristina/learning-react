# Children in React & Default Props

## Children

```JS
<Header>You can have text between tags</Header>
<Container>
    <h1>You can also have elements</h1>
    <p>between the tags!</p>
</Container>
```

Whatever is between the opening and closing take of an element will be accessible inside of the component using `props.children`.

Ex:

```JS
function Header ({children}) {
    return (
        <h1 className='header'>
        {children}
        </h1>
    )
}
```

this helps us abstract common UI + functionality into their own resusable components.

## Default Props

We can assign default props just in case the consumer of the component doesn't specify one.

### With Class Components

You can add a static property of `defaultProps` to your class.
`defaultProps` is an object whose keys represent the props being passed to the component and whose values are the default values for the props

Example:

```JS
class StarRating extends React.Component {
    ...
}

StarRating.defaultProps = {
    color: 'pink'
}
```

### With Function components

ES6 introduced Default Parameters which we can use with function components.
Allows you to set default values for any arguments that are undefined when a function is invoked.

Example:

```JS
function StarRating ({ color = 'pink'}) {
    ...
}
```
