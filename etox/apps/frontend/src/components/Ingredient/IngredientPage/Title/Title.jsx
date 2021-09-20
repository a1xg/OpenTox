import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import Rating from './Rating/Rating.jsx';
import { Typography } from "@material-ui/core";

const Title = (props) => {
    return (
        <div>
            <Typography variant='h5'>{props.data.ingredient.main_name}</Typography>
            <Rating rating={props.data.ingredient.hazard.ingredient_hazard_avg} />
        </div>
    )

};

export default Title;