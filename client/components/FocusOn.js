import React from 'react';

/**
 * Helper components that highlights a given word in a text
 * @param {*} props 
 */
const FocusOn = props => {
    const target = props.target.replace(',','');
    const text = props.text;
    const split = text.split(' ');
    return <span> {
            split.map(part => part == target ? <b style={{color : "blue"}} key={part}>{part} </b> : <span>{part} </span>)
        }
    </span>
}

export default FocusOn