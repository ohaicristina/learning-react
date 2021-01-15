import React from 'react'
import PropTypes from 'prop-types'

// building this component with the idea of making it customizable and reusable

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center'
    }
}
export default class Loading extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            content: props.text // customizing this string
        }
    }
    componentDidMount() {
        const { speed, text } = this.props;

        // every 300ms, this function will be invoked
        this.interval = window.setInterval(() => {
            this.state.content === text + '...'
                ? this.setState({ content: Loading })
                // because this is being updated based on the previous state, we can use a functional setstate
                : this.setState(({ content }) => ({ content: content + '.' }))
        }, speed) // customizing this interval
    }
    // the setInterval function is still trying to run even though the component has been unmounted
    // this will prevent the memory leak from happening
    componentWillUnmount() {
        window.clearInterval(this.interval) // we can access this instance property because it was set in component did mount
    }
    render() {
        return (
            <p style={styles.content}>{this.state.content}</p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}