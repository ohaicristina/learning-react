import React from 'react';
import PropTypes from 'prop-types';
import { FaFighterJet, FaTrophy, FaUserFriends } from 'react-icons/fa';

function Instructions() {
    return (
        <div className="instructions-container">
            <h1 className="center-text header-lg">Instructions</h1>
            <ol className="container-sm grid center-text battle-instructions">
                <li>
                    <h3 className="header-sm"> Enter two GitHub users</h3>
                    <FaUserFriends className="bg-light" color='#727272' size={140} />
                </li>
                <li>
                    <h3 className="header-sm"> Enter two GitHub users</h3>
                    <FaFighterJet className="bg-light" color='#8a8a8a' size={140} />
                </li>
                <li>
                    <h3 className="header-sm"> Enter two GitHub users</h3>
                    <FaTrophy className="bg-light" color='#949494' size={140} />
                </li>
            </ol>
        </div>
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
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className="player-label">{this.props.label}</label>
                <div className="row player-inputs">
                    {/* This is a controlled component - value and state lives in react, not in the DOM like normal */}
                    {/* Whenever you have a controlled component, the value is going to be whatever it is on the local state */}
                    {/* To update that value, you need to update the local state with an onChange function  */}
                    <input
                        text="text"
                        id="username"
                        className="input-light"
                        placeholder="Add a GitHub username"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleChange} // if you don't include this, when you type in the input nothing will happen
                    />
                    {/* User types something in the input field, React sees that it's changes and refers to the function we've made (which updates the local state). The local state is the value of the component so it changes! */}
                    <button
                        className="btn dark-btn"
                        type="submit"
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
}

export default class Battle extends React.Component {
    // this component is for the whole page
    // if we put all the logic for the player input here, it clutters it up
    // more appropriate for it to be abstracted out into its own component
    // so that we can just render it here with props and keep this one simple and focused on the page itself
    render() {
        return (
            <React.Fragment>
                <Instructions />
                <PlayerInput label="Label!" onSubmit={(value) => console.log(value)} />
            </React.Fragment>
        )
    }
}