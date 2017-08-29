import React from 'react';

/**
 * a helper returning selected word class name if relevant
 */
const selectedClassName = (sentence, sentenceReference, word, wordReference) => {
    return ((sentence == sentenceReference) && (word == wordReference) ) ? "word--selected"  : ""
}


/**
 * a sentence and word split array of array
 * @param {*} param0 
 */
const Text = ({data, onSelect, selected}) => {
    const sentences = data;
    const {sentence, word} = selected;
    console.log('selected', selected);
    return (<div className="text">
        {
            sentences.map((currentSentence, sentenceIndex) => (
                <div className="sentence" key={sentenceIndex}>
                    {
                        currentSentence.map((currentWord, wordIndex) => 
                            <span  className={`word ${selectedClassName(sentence, sentenceIndex, word, wordIndex)}`}
                                    onClick={onSelect.bind(null, sentenceIndex, wordIndex)}
                                    key={`${sentenceIndex}${wordIndex}`}>{currentWord}</span>)
                    }
                </div>
            ))
        }
    </div>)
}

export default Text;