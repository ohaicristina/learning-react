import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular'; // import the component(s) we're using on the page

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Popular />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)