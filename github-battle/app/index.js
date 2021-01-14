import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular'; // import the component(s) we're using on the page
import Battle from './components/Battle'; // omfg, this was the dumbest bug. Basically, webpack wasn't catching changes from the Battle and Results components because this file path wasn't matching the capitalization of Battle before now

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Battle />
                {/* <Popular /> */}
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)