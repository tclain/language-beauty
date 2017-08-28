import React from 'react';


const items = [
    //{key: "import",  label: 'Import'},
    {key: "explore", label: 'Explore'},
    {key: "insights", label: 'Insights'}
]

export default props => (
    <div className="menu">
        {
            items
                .map(item =>
                    <div
                        className={`menu-item ${props.selected == item.key ? "menu-item-selected" : ""}`}
                        onClick={props.onSelectItem.bind(null, item.key)} key={item.key}>
                        {item.label}
                    </div>
                )
        }
    </div>
)