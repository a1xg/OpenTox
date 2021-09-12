import React from 'react';

const Legend = (props) => {
    console.log('Legend props', props);
    return (
        <div>
            <p>{props.data.description.join(', ')}</p>
            <p>{props.colors.backgroundColors.join(', ')}</p>
        </div>
    )
};

export default Legend;