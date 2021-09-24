import React from 'react';
import RatingBar from '../../../../Charts/RatingBar.jsx';

// TODO перенести рейтинг бары на nivo или SVG

const Rating = (props) => {
    return (
        <div style={{width:200, height:20}}>
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