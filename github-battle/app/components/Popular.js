import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

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
            selectedLanguage: 'All',
            repos: null, // we'll know loading will be true if both repos and error are null
            error: null, // that way you don't need an explicit "loading" state
        }
        this.updateLanguage = this.updateLanguage.bind(this); // makes sure that the context in which `this` is invoked is in the component
        this.isLoading = this.isLoading.bind(this); // makes sure that the context in which `this` is invoked is in the component
    }

    componentDidMount() {
        // this is an API call
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage,
            repos: null,
            error: null,
        })

        // i am torn between how simple this is and that i was overthinking how fetching data works the whole time
        // and that i'm honestly still a little confused and this is some sort of devil magic happening
        // like this state is just a thing we made up but it's somehow working????
        // it's like how if i think about chemistry too much i'm just like yeah okay sure "atoms" whatever you say
        fetchPopularRepos(selectedLanguage)
            .then((repos) => this.setState({
                repos,
                error: null,
            }))
            .catch(() => {
                console.warn('Error fetching repos:', error)

                this.setState({
                    errror: "There was an error fetching the repos"
                })
            })
    }
    isLoading() {
        return this.state.repos === null && this.state.error === null;
    }

    render() {
        const { selectedLanguage, repos, error } = this.state;
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                {this.isLoading() && <p>Loading...</p>}
                { error && <p>{error}</p>}
                { repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </React.Fragment>
        )
    }
}