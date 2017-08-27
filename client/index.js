import React from 'react';
import {render} from 'react-dom';

// simple component
const App = props => <div>hello</div>

// boot app
render(<App/>, document.getElementById('app'));