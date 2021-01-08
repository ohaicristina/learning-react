import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';
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

function ReposGrid({ repos }) {
    return (
        <ul className="grid space-around">
            {repos.map((repo, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo; // this is called destructuring
                const { login, avatar_url } = owner;

                return (
                    <li key={html_url} className="repo bg-light center-text">
                        <h4 className="header-lg">
                            #{index + 1}
                        </h4>
                        <img className="avatar"
                            src={avatar_url}
                            alt={`Avatar for ${login}`}
                        />
                        <h2>
                            <a href={html_url}>{login}</a>
                        </h2>
                        <ul className="card-list">
                            <li>
                                <FaUser color='rgb(255, 191, 116)' size={22} />
                                <a href={`https://github.com/${login}`}>
                                    {login}
                                </a>
                            </li>
                            <li>
                                <FaStar color='rgb(255, 215, 0)' size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                                {open_issues.toLocaleString()} open
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {}, // we're changing this from null to an object so we can more easily cache it in the local state
            error: null,
            // we'll know loading will be true if both repos and error are null
            // that way you don't need an explicit "loading" state
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
            error: null,
        })

        if (!this.state.repos[selectedLanguage]) {
            // whatever the selectedLanguage is on the new object will be the data we get back from the api
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    // instead of passing setState an object, we're passing it a function that takes the current repos state data/properties, and merges it with a new repos object
                    this.setState(({ repos }) => ({
                        repos: { // taking the current repos state object
                            ...repos, // merging it with the new one
                            [selectedLanguage]: data // now, whatever the selectedLanguage is on the new object, will be the data we get back from the API
                        }
                    }))
                })
                .catch(() => {
                    console.warn('Error fetching repos:', error)

                    this.setState({
                        errror: "There was an error fetching the repos"
                    })
                })

            // old fetchPopularRepos function
            {/* fetchPopularRepos(selectedLanguage)
                    .then((repos) => this.setState({
                        repos, // we don't want to just set the data we get back from the API to the state itself, we want to set it as a property on the repos object
                        error: null,
                    }))
                    .catch(() => {
                        console.warn('Error fetching repos:', error)

                        this.setState({
                            errror: "There was an error fetching the repos"
                        })
                    }) */}
        }
    }
    isLoading() {
        // we need to update this because repos will no longer be null since its an object now
        // return this.state.repos === null && this.state.error === null;
        const { selectedLanguage, repos, error } = this.state; // grabbing these from our state, idk why it just clicked for me that you can do this????
        return !repos[selectedLanguage] && error === null
        // if repos[selectedLanguage] isn't a thing yet and there's no errors

        // Note on dot notation vs bracket notation
        // both are used to access properties on an object
        // dot notation is more common
        // bracket notation is used with arrays. example:
        // let pets = ['cat','dog','bunny']
        // console.log(pets[0]) // same as saying pets.cat
        // bracket notation is also used with objects like we're doing here
        // the brackets have fewer limitations because the property identifiers only need to be a string
        // can have spaces and start strings with numbers, as well as use variables to access 
        // properties in an object (as long as the var resolves to a string) (this is what we're doing here)
        // notes from: https://codeburst.io/javascript-quickie-dot-notation-vs-bracket-notation-333641c0f781
        // from airbnb's style guide: "Always use Dot. And when you want to access object property with a variable, use Bracket"
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
                { repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </React.Fragment>
        )
    }
}