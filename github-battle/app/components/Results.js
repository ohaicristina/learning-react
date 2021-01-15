import React from 'react'
import { FaBriefcase, FaCompass, FaUsers, FaUser, FaUserFriends } from 'react-icons/fa'
import { battle } from '../utils/api'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

function ProfileList({ profile }) { // needed to refactor this into a class component when we had the tooltip in this component because we needed to add state to it. See Tooltip.js
    // you could also use hooks
    return (
        <ul className="card-list">
            <li>
                <FaUser color='rgb(239, 115, 155)' size={22} />
                {profile.name}
            </li>
            {profile.location &&
                <li>
                    <Tooltip text="User's location">
                        <FaCompass color='rgb(114, 115, 255)' size={22} />
                        {profile.location}
                    </Tooltip>
                </li>
            }
            {profile.company &&
                <li>
                    <Tooltip text="User's company">
                        <FaBriefcase color='rgb(89, 200, 255)' size={22} />
                        {profile.location}
                    </Tooltip>
                </li>
            }
            <li>
                <FaUsers color='rgb(89, 200, 255)' size={22} />
                {profile.followers.toLocaleString()}
            </li>
            <li>
                <FaUserFriends color='rgb164, 185, 193)' size={22} />
                {profile.following.toLocaleString()}
            </li>
        </ul>
    )
}

export default class Results extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true,
        }
    }
    componentDidMount() {
        const { playerOne, playerTwo, onReset } = this.props

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
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
            return <Loading />
        }
        if (error) {
            return (
                <p className="center-text error">{error}</p>
            )
        }

        return (
            <React.Fragment>
                <div className="grid space-around container-sm">
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        avatarLink={winner.profile.html_url}
                        name={winner.profile.login}
                    >
                        <ProfileList profile={winner.profile} />
                    </Card>
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Loser'}
                        subheader={` Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        avatarLink={loser.profile.html_url}
                        name={loser.profile.login}
                    >
                        <ProfileList profile={loser.profile} />
                    </Card>
                </div>
                <button
                    className="dark-btn btn btn-space"
                    onClick={this.props.onReset}
                >
                    Reset Players
                </button>
            </React.Fragment>
        )
    }
}