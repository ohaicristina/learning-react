import React from 'react';
import PropTypes from 'prop-types';

// abstracting the nav into its own functional component
function LanguagesNav(props) {
    const { selected, onUpdateLanguage } = props; // did this to make sure i understood that it's the same as dowing function LanguagesNav({selected, onUpdateLanguage})
    const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python'];
    return (
        <ul className="flex-center">
            {languages.map((language) => (
                <li key={language}>
                    <button
                        className="btn-clear nav-link"
                        style={language === selected ? { color: 'pink' } : null}
                        onClick={() => onUpdateLanguage(language)}
                    >
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

// proptypes is JS built in type checking
// we use typescript so this is only slightly relevant
LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired,
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All'
        }
        this.updateLanguage = this.updateLanguage.bind(this); // makes sure that the context in which `this` is invoked is in the component
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        })
    }

    render() {
        const { selectedLanguage } = this.state;
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
            </React.Fragment>
        )
    }
}