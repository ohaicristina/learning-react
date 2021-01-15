import React from 'react'

// Higher Order Component
// this component is just a function that returns another component
// takes the original component and dresses it up in it's special logic outfit
// then spits out the original component with the new logic outfit on it
// like a dressing room
export default function withHover(Component, propName = 'hovering') { // propName helps prevent name collisions. 'hovering' will be the default unless specified
    return class WithHover extends React.Component {
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
            // This basically takes the old component prop situation on line 46 and moves it here
            const props = {
                [propName]: this.state.hovering,
                ...this.props
            }
            return (
                // pass the logic of hovering
                <div
                    mouseOut={this.mouseOut}
                    mouseOver={this.mouseOver}
                >
                    {/* return the component we passed in with the hovering prop  */}
                    {/* we need to pass in the original props of the component through to this component  */}
                    {/* <Component hovering={this.state.hovering} {...this.props} /> */}
                    {/* the object spread passes the original components props through to this rendered component */}

                    {/* new UI taking propName into account */}
                    <Component {...props} />
                </div>
            )
        }

    }
}