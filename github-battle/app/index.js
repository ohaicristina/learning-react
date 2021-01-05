import React from 'react';
import ReactDOM from 'react-dom';

// Component
// - State = managed by each component, app is built by composing components together
// - Lifecycle = fetching API data, running an event when the component is added tothe DOM etc.
// - UI = what's in the component - HTML

// PPL get made about the separation of concerns
// What's the concern of the component? three bullets above
// This is also means the styles are fair game in here but you lose the benefits of CSS when you do that, you retain HTMLs benefits when it's in JS

class App extends React.Component {
    render() {
        return <div>Hellow World!</div>
    }
}