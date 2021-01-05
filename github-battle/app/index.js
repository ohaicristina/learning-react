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
function isAuthed() {
    return true
}
function isNew() {
    return true
}

// React components need to start with an uppercase letter
// it's how react knows it's a custom element vs a regular html element
export default class App extends React.Component {
    render() {
        const authed = isAuthed()
        const firstLogin = isNew()

        return (
            // you can only return one top level element
            // if you don't need a div, use a react fragment <> stuff </>
            // this was the first cool new thing i brought to my old team that we could start doing :P
            <div>
                <h1>[logo]</h1>
                {/* JS ternaries, i use these all the time. was introduced to them at bevspot, got really good at them by the end of my time there */}
                { authed ? <h1>Welcome back!</h1> : <h1>Login to see your dashboard</h1>}
                { firstLogin &&
                    <h2>Welcome to your new account!</h2>
                }
            </div>
        )
    }
}

// this really only get renders once here in this file
ReactDOM.render(
    <App />,
    // where to render the element to
    document.getElementById('app')
)