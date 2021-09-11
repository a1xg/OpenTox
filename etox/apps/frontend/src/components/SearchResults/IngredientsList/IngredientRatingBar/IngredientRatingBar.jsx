import React from 'react';
import HazardBar from '../../../Charts/HazardBar.jsx';
import style from './IngredientRatingBar.module.css';

const IngredientRatingBar = (props) => {
    return (
        <div className={style['rating-bar']}>
            <HazardBar
                rating={props.rating}
                width={200}
                height={100}
                title='Ingredient hazard'
            />
        </div>
    )
};

export default IngredientRatingBar;