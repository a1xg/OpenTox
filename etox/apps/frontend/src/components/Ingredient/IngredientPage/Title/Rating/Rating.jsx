import React from 'react';
import RatingBar from '../../../../Charts/RatingBar.jsx';
import style from './Rating.module.css';

const Rating = (props) => {
    return (
        <div className={style['rating-bar']}>
            <RatingBar
                rating={props.rating}
                width={100}
                height={50}
                title={'Ingredient hazard'}
            />
        </div>
    )
};

export default Rating;