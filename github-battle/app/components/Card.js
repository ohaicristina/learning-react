import React from 'react'
import PropTypes from 'prop-types'

export default function Card(props) {
    const {
        header,
        subheader,
        avatar,
        avatarLink,
        name,
        children
    } = props;

    return (
        <div className="card bg-light">
            <h4 className="header-lg center-text">
                {header}
            </h4>
            <img
                className="avatar"
                src={avatar}
                alt={`Avatar for ${name}`}
            />
            { subeader &&
                <h4 className="center-text">
                    {subheader}
                </h4>
            }
            <h2 className="center-text">
                <a href={avatarLink} className="link">
                    {name}
                </a>
            </h2>
            {children}
        </div>
    )
}

Card.propTypes = {
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    avatarLink: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}