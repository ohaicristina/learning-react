import React from 'react'

// This is a render prop
export default class Hover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: false,
        }
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    // hovering
    // whenever a user is hovering over location or company, the tooltip shows
    mouseOver() { // take in the id of list item we're hovering (hoveringLocation or hoveringCompany)
        this.setState({
            hovering: true
        })
    }
    // not hovering
    mouseOut() {
        this.setState({
            hovering: false
        })
    }

    render() {
        return (
            <div
                onMouseOut={this.mouseOut}
                onMouseOver={this.mouseOver}
            >
                {/* Could also use a prop instead of children - up to whatever you prefer */}
                {/* `children` goes from representing an element to representing a function */}
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}