import React from 'react';

export default class Popular extends React.Component {
    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'CSS', 'Python']; // An array of all the list items we want in our popular page nav

        return (
            <ul className="flex-center"> {/**className is used because 'class' in JS already exists */}
                {languages.map((language) => (
                    // `languages` is the variable we set above
                    // `language` represents the array item (only a name for now)
                    <li key={language}>
                        <button className="btn-clear nav-link">
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}