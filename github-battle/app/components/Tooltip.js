import React, { Children } from 'react'
import PropTypes from 'prop-types'

const styles = {
    container: {
        position: 'relative',
        display: 'flex'
    },
    tooltip: {
        boxSizing: 'border-box',
        position: 'absolute',
        width: '160px',
        bottom: '100%',
        left: '50%',
        marginLeft: '-80px',
        borderRadius: '3px',
        backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
        padding: '7px',
        marginBottom: '5px',
        color: '#fff',
        textAlign: 'center',
        fontSize: '14px',
    }
}

// we can decouple this hovering logic to it's own higher order component
// will abstract it out to a `withHover` component
// export default class Tooltip extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             hovering: false,
//         }
//         this.mouseOver = this.mouseOver.bind(this)
//         this.mouseOut = this.mouseOut.bind(this)
//     }
//     // hovering
//     // whenever a user is hovering over location or company, the tooltip shows
//     mouseOver() { // take in the id of list item we're hovering (hoveringLocation or hoveringCompany)
//         this.setState({
//             hovering: true
//         })
//     }
//     // not hovering
//     mouseOut() {
//         this.setState({
//             hovering: false
//         })
//     }
//     render() {
//         const { hovering } = this.state;
//         const { text, children } = this.props;
//         // Usage
//         // <Tooltip text="User's company">
//         //     <h1>Hover over me!</h1>
//         // </Tooltip>

//         return (
//             <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={styles.container}>
//                 { hovering === true &&
//                     <div style={styles.tooltip}>{text}</div>
//                 }
//                 {children}
//             </div>
//         )
//     }
// }

function Tooltip({ text, children, hovering }) {
    return (
        <div style={styles.container}>
            { hovering === true &&
                <div style={styles.tooltip}>{text}</div>
            }
            {children}
        </div>
    )

}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    hovering: PropTypes.bool.isRequired
}

export default withHover(Tooltip)
// higher order component is a component
// takes in another component
// returns a new component
// the new component can render the original component