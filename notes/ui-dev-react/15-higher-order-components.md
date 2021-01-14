# Higher Order Components

Sometimes you'll have repeatable logic in a few different components. For example, detecting when you're hovering over a component to show/hide a tool tip.

Keeping code DRY - would be good to not duplicate that code anytime a component needs that same set of hovering logic.

functions = first-class objects
functions can be assigned to a variable, passed as an argument to a function or returned from a function

```JS
function add (x, y) {
    return x + y
}

function addFive (x, addReference) {
    return addReference(x, 5)
}

addFive(10, add) // 15
// ^ passing the `add` function as an argument
// 10 = x, add = addReference
// `addReference` becomes the `add` function
```

**Callback function:** a function you pass as an argument
**higher order function:** the function you pass a callback function to

In this example - `add` is the callback, `addFive` is the higher order function

```JS
function add  (x, y) {
    return x + y
}
function higherOrderFunction(x, callback) {
    return callback(x, 5)
}

higherOrderFunction(10, add)
```

How to make this reusable if you want to create a `addTen`, `addTwenty` etc. functions that use the same logic?

Create a `makeAdder` function that takes in a number and a reference to the original `add` function. Then have it return a new function that accepts the number we want to add.

```JS
function add(x, y) {
    return x + y
}

function makeAdder(x, addReference) { // x = the number you want to add by
    return function (y) { // accepts a number you want to  add to
        return addReference(x, y) // will use the `add` function which accepts two numbers and adds t hem
    }
}

const addFive = makeAdder(5, add) // this will return a function that accepts a number that we'll add 5 to
// returns function addFive(y) y will be added to x, which in this case is 5
const addTen = makeAdder(10, add) // this will return a function that accepts a number that we'll add 10 to
const addTwenty = makeAdder(20, add) // this will return a function that accepts a number that we'll add 20 to

addFive(10) // 15
addTen(10) // 20
addTwenty(10) // 30
addTwenty(7) // 27

```

`makeAdder` let's us make as many adding functions we need and not have to re-write it all the time

**Partial application:** functional programming technique where you have a function with multiple parameters returning a new function

## Making Higher Order Components

returning a new component that renders a "callback" component

### Higher Order Function

- is a function
- takes a callback as an argument
- returns a new function
- the function being returned can invoke the original callback that it was passed in

### Higher Order Component

- is a component
- takes in a new component as an argument
- returns a new component
- the component it returns can render the original component that was passed in

```JS
// higher order function
function higherOrderFunction(callback) {
    return function() {
        return callback()
    }
}

// higher order component
function higherOrderComponent(Component) {
    return class extends React.Component {
        render() {
            return <Component/>
        }
    }
}
```

Let's say we're duplicating this logic:

```JS
state ={ hovering: false }
mouseOver = () => this.setState({hovering: true})
mouseOut = () => this.setState({hovering: false})
```

Whenever we want a component that is aware of it's hovering state, pass the component that should have that hovering state to the higherOrder component.

`const InfoWithHover = withHover(Info)`
`const TrendChartWithHover = withHover(TrendChart)`

^ The components returned with `withHover` render the original component with a hovering prop

The `withHover` component needs three things:

**1.** takes in a component argument

```JS
function withHover(Component) {

}
```

**2.** returns a new component

```JS
function withHover(Component) {
 return class WithHover extends React.Component {

 }
}
```

**3.** renders the component argument with a 'hovering' prop

How do we get the 'hovering' state? Take the old hovering code that we had duplicated in all of the old components, and add it to the new component with the 'hovering' state as a prop when the Component argument is rendered

```JS
function withHover(Component) {
 return class WithHover extends React.Component {
     state = { hovering: false}
     mouseOver = () => this.setState({ hovering: true })
     mouseOut = () => this.setState({hovering: false})

     render() {
         return (
             <div onMouseOver={this.mouseOver} onMouseOut={this.onMouseOut}>
                <Component hovering={this.state.hovering}></Component>
             </div>
         )
     }
 }
}
```

A **component** transforms props into UI
A **higher order component** transforms a component into another component

### Two issues with the solution above

#### Naming collisions

What is the component already had a prop named "hovering"? No bueno
Need to allow the consumer of `withHover` to specify what they want to name the 'hovering' prop if they need to.

```JS
function withHover(Component, propName = 'hovering') { // adding a second argument to specify the name of the prop (has a default value of 'hovering' if you don't need to specify)
 return class WithHover extends React.Component {
     state = { hovering: false}
     mouseOver = () => this.setState({ hovering: true })
     mouseOut = () => this.setState({hovering: false})

     render() {
         const props = {
             [propName]: this.state.hovering
         }
         return (
             <div onMouseOver={this.mouseOver} onMouseOut={this.onMouseOut}>
                <Component {...props}></Component> // telling the component to put whatever props it receives from the higher order component on the new one
             </div>
         )
     }
 }
}
```

In use:

```JS
function Info (props) {
    const {
        showTooltip,
        height
    } = props;

    return (
        <>
            {showTooltip === true
                ? <Tooltip>
                : null
            }
            <svg height={height}></svg>
        </>
    )
}

const InfoWithHover = withHover(Info, 'showTooltip')
```

### Undefined initial component props

The `Info` component has a `height` prop. Above, it will be `undefined` which is also no bueno.

Need to let the higher order component accept additional props aside from the `hovering` prop that was created for it.

```JS
function withHover(Component, propName = 'hovering') {
 return class WithHover extends React.Component {
     state = { hovering: false}
     mouseOver = () => this.setState({ hovering: true })
     mouseOut = () => this.setState({hovering: false})

     render() {
         const props = {
             [propName]: this.state.hovering,
             ...this.props // this passes the props from the initial component through to the new component being returned
         }
         return (
             <div onMouseOver={this.mouseOver} onMouseOut={this.onMouseOut}>
                <Component {...props}></Component>
             </div>
         )
     }
 }
}
```

### HOC Pitfalls

Inversion of control. Can't avoid name collisions with 3rd party HOC
