# Component Lifecycle

**Note:** this is pre hooks, you can use `useEffect` for component lifecycle stuff now

Three parts of the lifecycle:

1. When a component is added to the DOM (mounting)
2. When a component updates state or receives new data (updating)
3. when a component is removed from the DOM (unmounting)

## Component Mounting Methods

### 1. Setting the component's initial state

`constructor` method -> from JS, this is where you use `this.state`

### 2. DOM node

`render` -> describes what the component/DOM node (`return` is where your JSX lives)

### 3. AJAX requests & Listeners

`componentDidMount` -> invoked only once when the component is first added to the DOM, this is where your AJAX calls and event listeners should live

## Component Update Methods

### 1. re-render UI with updated props

`render` -> use `this.setState` in the render method

### 2. Re-fetch data & resetting a listener

`componentDidUpdate` -> invoked when state changes or a component gets new props after the initial render

## Component Unmounting Methods

### Cleanup, removing listeners

`componentWillUnmount` -> helps protect against memory leaks by cleaning things up

There's other methods too but they aren't frequently used
