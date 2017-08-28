import React from 'react';

const FocusOn = props => {
    const target = props.target.replace(',','');
    const text = props.text;
    const split = text.split(' ');
    return <span> {
            split.map(part => part == target ? <b key={part}>{part} </b> : <span>{part} </span>)
        }
    </span>
}

export default props => {
    const insights = props.insights;
    if(!insights) return <div className="insights"></div>
    return (<div className="module insights">
        <h3>{props.word}</h3>
        <h3>Usage</h3>
        <ul>
            {
                insights.concordance.map(ref => <li key={ref}><FocusOn text={ref} target={props.word}/></li>)
            }
        </ul>
        <h3>Similar words in the work</h3>
        <div className="similar">
            {
                insights.similar.map(ref => <span key={ref}>{ref}, </span>)
            }
        </div>
    </div>)
}