import React from 'react';
import {render} from 'react-dom';
import './style/index.scss';

import {request} from './services/http';

// simple component
const App = props => <div>hello</div>

// boot app
render(<App/>, document.getElementById('app'));