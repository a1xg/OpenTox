import React from 'react';
import HazardBar from '../../../Charts/HazardBar.jsx';
import style from './ProductRatingBar.module.css';

const ProductRatingBar = (props) => {
    return (
        <div className={style['rating-bar']}>
            <HazardBar
                rating={props.rating}
                width={160}
                height={80}
                title={'Product rating'}
            />
        </div>
    )
};

export default ProductRatingBar;