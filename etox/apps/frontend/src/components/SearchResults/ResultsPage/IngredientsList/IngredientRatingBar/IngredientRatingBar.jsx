import React from 'react';
import RatingBar from '../../../../Charts/RatingBar.jsx';
import style from './IngredientRatingBar.module.css';

const IngredientRatingBar = (props) => {
    return (
        <div className={style['rating-bar']}>
            <RatingBar
                rating={props.rating}
                width={200}
                height={100}
                title='Ingredient rating'
            />
        </div>
    )
};

export default IngredientRatingBar;