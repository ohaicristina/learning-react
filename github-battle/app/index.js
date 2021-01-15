import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popular from './components/Popular'; // import the component(s) we're using on the page
import Battle from './components/Battle';
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => { // in order for us to consume this function, we need to pass it to the value in Provider
                this.setState(({ theme }) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }
    render() {
        return (
            // value is what's available to any component in the app that uses Consumer
            // now we can set the theme anywhere without needing to use props
            <ThemeProvider value={this.state}>
                {/* class of 'light' or 'dark' depending on the theme state */}
                <div className={this.state.theme}>
                    <div className="container">
                        <Nav />
                        <Battle />
                        {/* <Popular /> */}
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)