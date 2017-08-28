import React from 'react';
import Menu from './Menu';
import Import from './Import'
import Explore from './Explore';
import Insights from './Insights';
import {startup} from '../services/startup';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itemSelected : "explore",
            loading : false,
            // relevant data
            raw : [],
            rawOffset : 0,
        }
        // bind functions
        this.updateSelectedMenuItem = this.updateSelectedMenuItem.bind(this);
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

    componentDidMount(){
        this.setState({loading : true});
        startup().then(raw => this.setState({raw, loading: false})).catch({loading : false});
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
            {
                this.state.itemSelected == "import" && <Import/>
            }
            {
                this.state.itemSelected == "explore" &&  <Explore data={this.state.data} /> 
            }
            {
                this.state.itemSelected == "insights" && <Insights />
            }
        </div>)
    }
}