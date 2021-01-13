# Children in React

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
