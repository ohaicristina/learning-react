# React Elements vs React Components

## React Element

- an object representation of a DOM node – it describes what you see on the screen
- lightweight; this is good because react creates/destroys them without a lot of overhead
  - React will update onl the piece of the DOM that needs updating = performance bennies

## React Component

- just a function (or class) which accepts optional inputs and returns a **react element**

## Breaking down a React Element

When we write JSX, it gets compiled (via Babel) to something that looks like this:

```JS
const element = React.createElement (
    'div', // tag name (div, span, h1 etc.)
    {id: 'login-btn' }, // attributes (class, id, etc.)
    'Login' // child of the element
)
```

This then returns a JSON object that looks like this:

```JS
{type: 'div', // tag name
    props: {
        children: 'Login', // child of the element
        id: 'login-btn' // attributes
    }
}
```

This then gets rendered to the DOM (via `ReactDOM.render`) and looks like this:

```HTML
<div id="login-btn">Login</div>
```

**Note:** You could also pass in other React components (which are technically just a class or a function) as the first argument in `React.createElement`

Because of this, React ends up with the full object representation of the DOM tree.
This process is known as **reconciliation** (wadup fellow catholics). It gets triggered everytime `setState` or `ReactDOM.render` is called
