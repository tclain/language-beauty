import React from 'react';
import FocusOn from '../components/FocusOn';


/**
 * Highlights on the right for a given word
 */
export default props => {
    const insights = props.insights;
    if(!insights) return <div className="module insights"> <h3>Click a word to start</h3></div>
    return (<div className="module insights">
        <h3 class="word-origin">{props.word}</h3>
        <h3>Similar words in the work</h3>
        <div className="similar">
            {
                insights.similar.map(ref => <span key={ref}>{ref}, </span>)
            }
        </div>
        <h3>Usage</h3>
        <ul>
            {
                insights.concordance.map(ref => <li key={ref}><FocusOn text={ref} target={props.word}/></li>)
            }
        </ul>
    </div>)
}