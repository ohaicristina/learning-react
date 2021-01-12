# Managing State in React

- React doesn't make you keep track of the entire app's state, just each individual component
- You can add state, and update state in components

## How to Add state to a component

**Note:** this is "old" react, pre-hooks

1. Use the `constructor` method
   a. this is a part of ES6, not react specific
2. will likely need `super(props)` within the `constructor`
   a. `super` refers to the `constructor` method of the class you're extending (`React.Component`)
   b. you won't be able to use `this` until you've called `super`
   c. there's some reasons you need to pass props to super, but not necessary rn
3. add state to the class component using `this.state = {}`
   a. we can use `this` because we've called `super`
   b. you can include whatever properties you want on the state
   c. the initial states are generalls false, empty strings, and null depending on the data

## How to Update a component's state

- you don't want to update the state directly in the DOM because React won't know that the component has changed
- React updates the DOM for you when the state of the component changes

Use `this.setState`

- helper method from React
- there are two forms of setState

### 1. `setState` can accept an **object** as its first argument and then is merged with the current state

Example:

```JS
updateName(newName) {
    this.setState({
        name: newName
    })
}

// needs to be called in the constructor or else you'll get a type error about not being able to read `property of setState` because it's undefined
// this basically says "whenever updateName is invoked, always make sure it's invoked in the context of the current component
// remember .bind from earlier?
this.updateName = this.updateName.bind(this)
```

The object you pass into setState gets **merged** with the current state, not replaced which means that other properties that weren't updates in the component will remain the same.

> What's the difference between a function and a method?
> A method is a type of function. it's a function that belongs to an _object_
> Pretty much everything in JS is an object.
> It's a function with a defined `this`

### 2. `setState` can accept a **function** as its first argument and returns an object that will be merged to the new state

Example:

```JS
addFriend(newFriend) {
    this.setState((state => {
        return {
            friends: state.friends.concat(newFriend)
        }
    }))
}
```

`addFriend` takes a `newFriend` and adds it to the `friends` state

### When do you use function setState over object setState?

Depends on what changes y ou're making to the state

- if you're updating the current state based on the previous state (like adding newFriend to the existing array) use the **function** method
- everything else can just be an object
