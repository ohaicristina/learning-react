import React from 'react'
import PropTypes from 'prop-types'
import Hover from './Hover'

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

// changing this to use Render Props
// avoids naming collisions
export default function Tooltip({ text, children }) {
    return (
        <Hover>
            {/* The actual Tooltip component gets rendered instead of the old `<WithHover>` component from withHover() */}
            {/* Now we can just call this whatever we want it to be */}
            {(hovering) => (
                <div style={styles.container}>
                    {hovering === true &&
                        <div style={styles.tooltip}>{text}</div>
                    }
                    {children}
                </div>
            )}
        </Hover>
    )
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
}
