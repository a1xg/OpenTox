import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import RatingBar from './RatingBar/RatingBar.jsx';

const Title = (props) => {
    return (
        <div>
            {props.data.ingredient.main_name}
            <RatingBar rating={props.data.ingredient.hazard.ingredient_hazard_avg} />
        </div>
    )

};

export default Title;