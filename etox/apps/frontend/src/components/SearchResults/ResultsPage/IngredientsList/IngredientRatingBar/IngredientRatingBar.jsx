import React from 'react';
import RatingBar from '../../../../Charts/RatingBar.jsx';
//TODO сделать вывод различного рейтинга для ингредиентов с классом NO_DATA_AVAILABLE и кодами (Not Classified | NA).

const IngredientRatingBar = (props) => {
    return (
        <div style={{width:100, height:14}}>
            <RatingBar rating={props.rating} />
        </div>
    )
};

export default IngredientRatingBar;