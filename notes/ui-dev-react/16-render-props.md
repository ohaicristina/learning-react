# Render Props

## Random notes on functions

`this.withHover()` - the parenthesis calls the function. Use parenthesis if you need to call the function _right here and now_
`this.withHover` - no parenthesis means you're just _passing the function_ to other code so it can be used
`() => this.withHover()` - use for passing callback functions to children
This gives the child component access to the function inside of the props being passed to it

Also has to do with the context of `this`. With regular functions, we've been using bind. If we don't, the `this` inside of the callMe() function ends up as undefined.

```JS
callMe() {
    console.log(this.name)
}

<button onClick={this.callMe}>click</button> // the this in the console log will be undefined unless it's bound
```

Arrow functions bind the `this` keyword automatically so we don't need to use the bind we've been using

```JS
callMe() {
    console.log(this.name)
}

<button onClick={() => this.callMe}>click</button> // the this here now inherits the this from the outer scope
```

The above could potentially result in performance issues (though not usually) so another way to do this is to use the 'public class fields syntax':

```JS
// The arrow syntax ensures that `this` is bound within callMe
callMe = () => {
    console.log(this.name)
}

<button onClick={this.callMe}>click</button>
```

**Note:** In JavaScript, class methods are not bound by default (which is why we either need to use bind or an arrow function)

Inside a loop, you might want to pass an extra parameter to an event handler. In this example, `id` is the row id (With regard to bind, the two following lines are the same.)

```JS
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

**NOTE:** I actually don't know if the following is true?
Can also be used to encapsulate a function to prevent running into an infinite loop

The following would run the function as soon as the component is rendered, which changes the state and causes a re-render, and it would continue infinitely.
`<button onClick={increaseCount(count + 1)}>+</button>`

Encapsulating a callback function in an arrow function means that the function declaration is just stored, not run until onClick happens.
`<button onClick={() => increaseCount(count + 1)}>+</button>`

### Difference between arrow and normal functions

**Normal** function:

```JS
    function sum(x, y) {
        return x + y
    }
```

**Arrow** function:

```JS
const sum = (x, y) => {
    x + y
}
```

(The arrow function doesn't need a return statement when there's one line of code)
Arrow function is more concise.
Regular functions changes the context of the `this` keyword so that you need to `bind` it (like we've been doing). Arrow functions don't need to `bind`.

### Callback functions

Information in react gets passed around to components in two different ways:

1. Parent to child (passing down) using **props**
2. Child to parent (passing up) also uses props but needs to pass down a **callback function** instead of a piece of the state

Callback function = purpose is to change a piece of the state that is part of the parent component.

```HTML
    --------> Props -------v
    |                      |
    |                      |
Parent                   Child
Component            Component
    |                      |
    |                      |
    ^----- Callback <------
           Function
```

## No UI Components

Most of the time, components are rendering UI.
Wrapper components - responsible for handling some logic but instead of rendering UI, they render another component, passing it data.

## Passing Functions as Props

You can pass functions inside of props. For Example:

Passing a string:

```JS
<User id="tyler"/> // this passes a string

function User (props) {
    const id = props.id // tyler
}
```

Passing a function:

```JS
<User id={() => 'tyler'}/> // this passes a function that returns the 'tyler' string

function User (props) {
    const id = props.id() // invoking the function to return 'tyler'
}
```

Passing a function prop data with an argument:

```JS
<User id={(isAuthed) => isAuthed === true ? 'tyler' : null}/>

function User (props) {
    const id = props.id(true) // this will render 'tyler' because it's true, if it were false it would render 'null'
}
```

In our `withHover` component, we could also create a Wrapper component that manages the hover state and pass a function to the Wrapper's prop:

```JS
class Hover extends React.Component {
    state = {
        hovering: false,
    }
    mouseOver = () => this.setState({hovering: true}) // don't need to bind this because arrow function
    mouseOut = () => this.setState({hovering: false})
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {/* onMouseOver and onMouseOut are given to use from react*/}
            </div>
        )
    }
}
```

What should our `Hover` component render? `Hover` can receive a prop that we'll call `render`. It will be a _function_ that we can pass the hovering state to and return UI:

```JS
<Hover render={(hovering) =>
    <div>
        Is hovering? {hovering === true ? 'Yes' : 'No'}
    </div>
}/>

// Need to change our Hover component to invoke `this.props.render` and pass it `this.state.hover`
class Hover extends React.Component {
    state = {
        hovering: false,
    }
    mouseOver = () => this.setState({hovering: true})
    mouseOut = () => this.setState({hovering: false})
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                { this.props.render(this.state.hovering)}
            </div>
        )
    }
}
```

This pattern is known as **Render Props**
("the term _render props_ refers to a technique for share code between React components using a prop whose value is a function)

We could also use render props with the `children` prop:

```JS
function User (props) {
    return (
        <div>{props.children}</div>
        // props.children is a string
    )
}
<User>This is props.children</User>
```

What is props.children was a function? We need to **invoke** the function to get its value:

```JS
function User (props) {
    return (
        <div>{props.children()}</div>
        // props.children is a function
        // invoking the function here to get the value
    )
}
<User>
    {() => This is props.children} // anonymous function
</User>
```

An alternative to having our `Hover` component use a prop - using `props.children` instead.

```JS
<Hover>
    {(hovering) => <div>yay</div>}
</Hover>
<Hover>
    {(hovering) => <div>i'm a hoverable element</div>}
</Hover>

class Hover extends React.Component {
    state = { hovering: false }
    mouseOver = () => this.setState({hovering: true})
    mouseOut = () => this.setState({hovering: false})
    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                { this.props.children(this.state.hovering)}
            </div>
        )
    }

}

```

Nothing objectively better about using children vs your own props. Just a different method.

### How does this relate to HOCs?

HOCs have pitfalls: inversion of control and naming collisions.
Render Props hands over a function rather than a component. When that function is invoked, it will pass us the data we need which avoids the pitfalls because we decide how the component is rendered.

You can use both to accomplish the same results. Up to you to decide which one you wanna use
