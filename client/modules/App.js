import React from 'react';
import Menu from './Menu';
import Import from './Import'
import Explore from './Explore';
import Insights from './Insights';
import {startup} from '../services/startup';
import rpc from '../services/data';


export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itemSelected : "explore",
            loading : false,
            // relevant data
            content : [],
            selected : {
                originWord : null,
                sentence : null,
                word : null
            },
            // current analysis
            insights : null,
            rawOffset : 0,
        }
        // bind functions
        this.updateSelectedMenuItem = this.updateSelectedMenuItem.bind(this);
        this.selectWord = this.selectWord.bind(this);
    }
    
    componentDidMount(){
        this.setState({loading : true});
        startup().then(initialText => this.setState({content : initialText, loading: false})).catch(err => this.setState({loading : false}));
    }

    /**
     * 
     * update current selected menu item
     * 
     * @param {any} item 
     * @memberof App
     */
    updateSelectedMenuItem(item) {
        this.setState({itemSelected : item});
    }

    /**
     * select a specific word for further analysis
     * 
     * @param {any} sentencesIdx 
     * @param {any} wordIdx 
     * @memberof App
    
     * 
     */
    selectWord(sentenceIdx, wordIdx){
        this.setState({insights : null});
        if(this.state.selected.sentence == sentenceIdx && this.state.selected.word == wordIdx){
            this.setState({
                ...this.state, 
                selected : {
                    originWord : null,
                    sentence : null,
                    word : null
                },
                insights : null
            })
        }
        else {
            const originWord = this.state.content[sentenceIdx][wordIdx];
            this.setState({
                ...this.state, 
                selected : {
                    originWord : originWord,
                    sentence : sentenceIdx,
                    word : wordIdx
                }
            })

            rpc.insights(originWord).then(insights => {
                this.setState({insights}, () => console.log(this.state))
            });
        }
    }

    /**
     * 
     * render component
     * 
     * @returns 
     * @memberof App
     */
    render() {
        return (<div className="layout">
            <Menu onSelectItem={this.updateSelectedMenuItem} selected={this.state.itemSelected} />
            <div className="content">
                {
                    this.state.itemSelected == "explore" && !this.state.loading 
                    &&
                    <Explore data={this.state.content} selected={this.state.selected} onSelect={this.selectWord} /> 
                }
                <Insights insights={this.state.insights} word={this.state.selected.originWord} />    
            </div>
        </div>)
    }
}