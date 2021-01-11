import React from 'react';
import { battle } from '../utils/api';

export default class Results extends React.Component {
    // when the components mounts, invoke the battle function comparing the user names of player one and player two
    componentDidMount() {
        const { playerOne, playerTwo } = this.props;

        battle([playerOne, playerTwo]).then(
            (players => {
                console.log(players)
            })
        )
    }
    render() {
        return (
            <div>
                Results:
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        )
    }
}