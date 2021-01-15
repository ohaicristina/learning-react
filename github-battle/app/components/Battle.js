import React from 'react'
import PropTypes from 'prop-types'
import { FaFighterJet, FaTimesCircle, FaTrophy, FaUserFriends } from 'react-icons/fa'
import Results from './Results'
import { ThemeConsumer } from '../contexts/theme'

function Instructions() {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className="instructions-container">
                    <h1 className="center-text header-lg">Instructions</h1>
                    <ol className="container-sm grid center-text battle-instructions">
                        <li>
                            <h3 className="header-sm"> Enter two GitHub users</h3>
                            <FaUserFriends className={`bg-${theme}`} color='#727272' size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm"> Enter two GitHub users</h3>
                            <FaFighterJet className={`bg-${theme}`} color='#8a8a8a' size={140} />
                        </li>
                        <li>
                            <h3 className="header-sm"> Enter two GitHub users</h3>
                            <FaTrophy className={`bg-${theme}`} color='#949494' size={140} />
                        </li>
                    </ol>
                </div>
            )}
        </ThemeConsumer>
    )
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleSubmit(event) {
        // when the form is submitted, prevent default browse behavior
        // call onSubmit and pass the username
        event.preventDefault()
        this.props.onSubmit(this.state.username)
    }
    // this function is what's updating the state when the input's value changes
    handleChange(event) { //takes the value of the event
        this.setState({ // setState is for updating state
            username: event.target.value // the username state is updated with that value
        })
    }
    render() {
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <form className='column player' onSubmit={this.handleSubmit}>
                        <label htmlFor='username' className="player-label">{this.props.label}</label>
                        <div className="row player-inputs">
                            {/* This is a controlled component - value and state lives in react, not in the DOM like normal */}
                            {/* Whenever you have a controlled component, the value is going to be whatever it is on the local state */}
                            {/* To update that value, you need to update the local state with an onChange function  */}
                            <input
                                text="text"
                                id="username"
                                className={`input-${theme}`}
                                placeholder="Add a GitHub username"
                                autoComplete="off"
                                value={this.state.username}
                                onChange={this.handleChange} // if you don't include this, when you type in the input nothing will happen
                            />
                            {/* User types something in the input field, React sees that it's changes and refers to the function we've made (which updates the local state). The local state is the value of the component so it changes! */}
                            <button
                                className={` btn ${theme}-btn`}
                                type="submit"
                                disabled={!this.state.username}
                            >
                                Submit
                        </button>
                        </div>
                    </form>
                )}
            </ThemeConsumer>
        )
    }
}
PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

function PlayerPreview({ username, onReset, label }) {
    return (
        <ThemeConsumer>
            {({ theme }) => (
                <div className="column player">
                    <h3 className="player-label">{label}</h3>
                    <div className={`row bg-${theme}`}>
                        <div className="player-info">
                            <img
                                className="avatar-small"
                                src={`https://github.com/${username}.png?size=200`}
                                alt={`Avatar for ${username}`}
                            />
                            <a href={`https://github.com/${username}`}>
                                {username}
                            </a>
                        </div>
                        <button
                            className="btn-clear flex-center"
                            onClick={onReset}
                        >
                            <FaTimesCircle color='red' size={26} />
                        </button>
                    </div>
                </div>
            )}
        </ThemeConsumer>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    // updates the state with the corresponding input submission
    handleSubmit(id, player) {
        this.setState({
            // id = the state we're updating (either playerOne or playerTwo)
            // player = what to update the state with. in this case the value from the PlayerInput input components
            [id]: player // this is an ES6 computed property name
        })
    }
    handleReset(id) {
        this.setState({
            [id]: null
        })
    }
    // dummy note: re-render means this chunk of code gets re-rendered on the screen
    // so the reason why the main return chunk is replaced by the if battle === true one
    // is when this code is rendered, it will check for battle to be true then return that code and stop
    render() {
        const { playerOne, playerTwo, battle } = this.state;

        if (battle === true) {
            return (
                <Results
                    playerOne={playerOne}
                    playerTwo={playerTwo}
                    onReset={() => this.setState({
                        playerOne: null,
                        playerTwo: null,
                        battle: false
                    })}
                />
            )
        }

        return (
            <React.Fragment>
                <Instructions />
                <div className="players-container">
                    <h1 className="header-lg center-text">Players</h1>
                    <div className="row space-around">
                        {playerOne === null ? (
                            <PlayerInput label="Player One!" onSubmit={(player) => this.handleSubmit('playerOne', player)} />
                        ) : (
                                <PlayerPreview username={playerOne} label="Player One!" onReset={() => this.handleReset('playerOne')} />
                            )}
                        {playerTwo === null ? (
                            <PlayerInput label="Player Two!" onSubmit={(player) => this.handleSubmit('playerTwo', player)} />
                        ) : (
                                <PlayerPreview username={playerTwo} label="Player Two!" onReset={() => this.handleReset('playerTwo')} />
                            )}
                    </div>
                    {playerOne && playerTwo && (
                        <button
                            className="dark-btn btn btn-space"
                            onClick={() => this.setState({ battle: true })}
                        >
                            Battle
                        </button>
                    )}
                </div>
            </React.Fragment>
        )
    }
}