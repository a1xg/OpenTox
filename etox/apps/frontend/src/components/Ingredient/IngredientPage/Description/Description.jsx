import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Typography } from "@material-ui/core";

const Description = (props) => {
    return (
        <div><Typography variant='h6'>Description:</Typography>
            <Typography variant='body1'>{props.data.ingredient.description}</Typography>
        </div>
    )

};

export default Description;

