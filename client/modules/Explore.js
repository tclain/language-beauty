import React from 'react';

const Text = ({data}) => {
    const sentences = data;
    <div class="text">
        {
            sentences.map(sentence => (
                <div className="sentence">
                    {
                        sentence.map(word => (
                            <span className="word">{word}</span>
                            )
                        )
                    }
                </div>
            ))
        }
    </div>
}

export default ({data}) => (
    <div className="module explore">
        {data && <Text data={props.data || []} /> }
    </div>
)