import React from 'react';
import { FaBriefcase, FaCompass, FaUsers, FaUser, FaUserFriends } from 'react-icons/fa';
import { battle } from '../utils/api';

export default class Results extends React.Component {
    constructor(props) {
        super(props)

        // what do we need to know?
        // who is the winner
        // who is the loser
        // any errors
        // is the request still loading

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    }
    // when the components mounts, invoke the battle function comparing the user names of player one and player two
    componentDidMount() {
        const { playerOne, playerTwo } = this.props

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    // winner is ther first item in the players array
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }
    render() {
        const { winner, loser, error, loading } = this.state;

        if (loading === true) {
            return <p>Loading</p>
        }
        if (error) {
            return (
                <p className="center-text error">{error}</p>
            )
        }

        return (
            <div className="grid space-around container-sm">
                <div className="card bg-light">
                    <h4 className="header-lg center-text">
                        {winner.score === loser.score ? 'Tie' : 'Winner'}
                    </h4>
                    <img
                        className="avatar"
                        src={winner.profile.avatar_url}
                        alt={`Avatar for ${winner.profile.login}`}
                    />
                    <h4 className="center-text">
                        Score: {winner.score.toLocaleString()}
                    </h4>
                    <h2 className="center-text">
                        <a href={winner.profile.html_url} className="link">
                            {winner.profile.login}
                        </a>
                    </h2>
                    <ul className="card-list">
                        <li>
                            <FaUser color='rgb(239, 115, 155)' size={22} />
                            {winner.profile.name}
                        </li>
                        {winner.profile.location &&
                            <li>
                                <FaCompass color='rgb(114, 115, 255)' size={22} />
                                {winner.profile.location}
                            </li>
                        }
                        {winner.profile.company &&
                            <li>
                                <FaBriefcase color='rgb(89, 200, 255)' size={22} />
                                {winner.profile.location}
                            </li>
                        }
                        <li>
                            <FaUsers color='rgb(89, 200, 255)' size={22} />
                            {winner.profile.followers.toLocaleString()}
                        </li>
                        <li>
                            <FaUserFriends color='rgb164, 185, 193)' size={22} />
                            {winner.profile.following.toLocaleString()}
                        </li>
                    </ul>
                </div>
                <div className="card bg-light">
                    <h4 className="header-lg center-text">
                        {winner.score === loser.score ? 'Tie' : 'Loser'}
                    </h4>
                    <img
                        className="avatar"
                        src={loser.profile.avatar_url}
                        alt={`Avatar for ${loser.profile.login}`}
                    />
                    <h4 className="center-text">
                        Score: {winner.score.toLocaleString()}
                    </h4>
                    <h2 className="center-text">
                        <a href={loser.profile.html_url} className="link">
                            {loser.profile.login}
                        </a>
                    </h2>
                    <ul className="card-list">
                        <li>
                            <FaUser color='rgb(239, 115, 155)' size={22} />
                            {loser.profile.name}
                        </li>
                        {loser.profile.location &&
                            <li>
                                <FaCompass color='rgb(114, 115, 255)' size={22} />
                                {loser.profile.location}
                            </li>
                        }
                        {loser.profile.company &&
                            <li>
                                <FaBriefcase color='rgb(89, 200, 255)' size={22} />
                                {loser.profile.location}
                            </li>
                        }
                        <li>
                            <FaUsers color='rgb(89, 200, 255)' size={22} />
                            {loser.profile.followers.toLocaleString()}
                        </li>
                        <li>
                            <FaUserFriends color='rgb164, 185, 193)' size={22} />
                            {loser.profile.following.toLocaleString()}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}