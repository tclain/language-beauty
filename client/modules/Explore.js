import React from 'react';
import Text from './Text';

export default props => (
    <div className="module explore">
        {props.data && <Text {...props}/> }
    </div>
)