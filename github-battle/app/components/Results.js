import React from 'react';
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
        return (
            <div>
                Results:
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }
}