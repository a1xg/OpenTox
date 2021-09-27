import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Typography } from "@material-ui/core";

const Description = (props) => {
    return (
        <Typography variant='body1'>
            {props.data.ingredient.description != null ? props.data.ingredient.description : 'not data'}
            </Typography>
    )

};

export default Description;

