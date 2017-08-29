import React from 'react';
import Menu from './Menu';
import Explore from './Explore';
import Insights from './Insights';
import { startup } from '../services/startup';
import rpc from '../services/data';

import { compose, withReducer, lifecycle, withProps } from 'recompose';
import { reducer, defaultState } from './App.reducer';

const AppContainer = compose(
    withReducer('state', 'dispatch', reducer, defaultState),
    withProps(({ dispatch, state }) => ({
        bootstrap: () => {
            dispatch({
                type: "loading",
                payload: true
            });
            startup().then(initialText => {
                dispatch({
                    type: "loading",
                    payload: false
                })
                dispatch({
                    type: "content",
                    payload: initialText
                })
            }).catch(err => {
                dispatch({
                    type: "loading",
                    payload: false
                })
                dispatch({
                    type: "error",
                    payload: false
                })
            });
        },
        selectWord: (sentenceIndex, wordIndex) => {
            const content = state.content;
            const selected = state.selected;
            // get the word
            const originWord = content[sentenceIndex][wordIndex];
            const sameAsLastSelected = selected.sentence == sentenceIndex && selected.word == wordIndex;

            // the user clicked again on the same word
            if (sameAsLastSelected) {
                dispatch({
                    type: "selectWord",
                    payload: {
                        originWord: null,
                        sentence: null,
                        word: null
                    }
                })
            }
            else {
                dispatch({
                    type: "selectWord",
                    payload: {
                        originWord,
                        sentence: sentenceIndex,
                        word: wordIndex
                    }
                });
                // run side effects /- we would have used -/
                rpc.insights(originWord).then(insights => {
                    dispatch({
                        type: 'insights',
                        payload: insights
                    })
                });
            }
        }
    })
    )
)



class AppComponent extends React.Component {
    componentDidMount() {
        this.props.bootstrap();
    }
    render() {
        const state = this.props.state
        const props = this.props;
        return (<div className="layout">
            <Menu />
            <div className="content">
                {
                    !state.loading
                    &&
                    <Explore data={state.content} selected={state.selected} onSelect={props.selectWord} />
                }
                {
                    !state.loading
                    &&
                    <Insights insights={state.insights} word={state.selected.originWord} />
                }
            </div>
        </div>)
    }
}


export default AppContainer(AppComponent);