import React from 'react';
// tbh this is a dumb name for a component
export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All'
        }
        this.updateLanguage = this.updateLanguage.bind(this); // make sure this is binded to this component
    }

    updateLanguage(selectedLanguage) {
        this.setState({ // setState is what triggers the rerender
            selectedLanguage
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python']; // An array of all the list items we want in our popular page nav

        return (
            <ul className="flex-center"> {/**className is used because 'class' in JS already exists */}
                {languages.map((language) => (
                    // `languages` is the variable we set above
                    // `language` represents the array item (only a name for now)
                    <li key={language}>
                        <button
                            className="btn-clear nav-link"
                            style={language === this.state.selectedLanguage ? { color: 'pink' } : null}
                            onClick={() => this.updateLanguage(language)} // if you don't wrap this in an arrow function, it will invoke the function, but we want to pass a definition
                        >
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}