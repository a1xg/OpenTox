import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';

const Description = (props) => {
    return (
        <div>
            {props.data.ingredient.description}
        </div>
    )

};

export default Description;

