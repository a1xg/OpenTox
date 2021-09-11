import React from 'react';
import HazardBar from '../../../../Charts/HazardBar.jsx';
import style from './RatingBar.module.css';

const RatingBar = (props) => {
    return (
        <div className={style['rating-bar']}>
            <HazardBar
                rating={props.rating}
                width={100}
                height={50}
                title={'Ingredient hazard'}
            />
        </div>
    )
};

export default RatingBar;