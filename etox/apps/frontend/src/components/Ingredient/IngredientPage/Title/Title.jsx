import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import Rating from './Rating/Rating.jsx';

const Title = (props) => {
    return (
        <div>
            {props.data.ingredient.main_name}
            <Rating rating={props.data.ingredient.hazard.ingredient_hazard_avg} />
        </div>
    )

};

export default Title;