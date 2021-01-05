// Setting up a React app from scratch, not using `create-react-app`
import React from 'react';
import ReactDOM from 'react-dom';
// This is separate from the react package because React can be used in multiple contexts, we're using it in a DOM context so we use the react-dom package
// You could be running React on like an xbox or a phone or something else
import './index.css'; // this works because of the babel css-loader 

// Component
// - State = managed by each component, app is built by composing components together
// - Lifecycle = fetching API data, running an event when the component is added tothe DOM etc.
// - UI = what's in the component - HTML

// PPL get made about the separation of concerns
// What's the concern of the component? three bullets above
// This is also means the styles are fair game in here but you lose the benefits of CSS when you do that, you retain HTMLs benefits when it's in JS

// These are class components, we used these when I was at bevspot
// We use functional components at Teal so this should be fun.
// We also use TypeScrip which everyone tells me is the harder way to learn so okay
class App extends React.Component {
    render() {
        // Babel makes this work nicey nice
        return <div>Hello World!</div>
    }
}

// this really only get renders once here in this file
ReactDOM.render(
    <App />,
    // where to render the element to
    document.getElementById('app')
)