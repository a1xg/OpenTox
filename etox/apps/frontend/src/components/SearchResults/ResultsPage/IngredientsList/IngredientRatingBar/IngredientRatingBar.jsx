import React from 'react';
import RatingBar from '../../../../Charts/RatingBar.jsx';

const IngredientRatingBar = (props) => {
    return (
        <div style={{width:100, height:14}}>
            <RatingBar rating={props.rating} />
        </div>
    )
};

export default IngredientRatingBar;