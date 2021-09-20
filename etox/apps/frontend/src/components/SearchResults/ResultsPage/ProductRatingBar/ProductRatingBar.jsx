import React from 'react';
import RatingBar from '../../../Charts/RatingBar.jsx';
import style from './ProductRatingBar.module.css';

const ProductRatingBar = (props) => {
    return (
        <div className={style['rating-bar']}>
            <RatingBar
                rating={props.rating}
                width={160}
                height={80}
                title={'Product rating'}
            />
        </div>
    )
};

export default ProductRatingBar;