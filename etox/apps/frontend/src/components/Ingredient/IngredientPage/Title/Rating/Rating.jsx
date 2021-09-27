import React from 'react';
import IngredientRatingBar from '../../../../Charts/IngredientRatingBar.jsx';


const Rating = (props) => {
    return (
        <div style={{width:200, height:20}}>
            <IngredientRatingBar rating={props.rating} />
        </div>
    )
};

export default Rating;