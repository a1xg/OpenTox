import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Typography } from "@material-ui/core";

const Details = (props) => {
    console.log('Details props', props);

    return (
        <div>
            <Typography variant='body1'>
            <p>{props.data.ingredient.cas_numbers.join(', ')}</p>
            <p>{props.data.ingredient.colour_index}</p>
            <p>{props.data.ingredient.ec_numbers.join(', ')}</p>
            <p>{props.data.ingredient.functions.join(', ')}</p>
            <p>{props.data.ingredient.pubchem_cid}</p>
            <p>{props.data.ingredient.request_statistics}</p>
            </Typography>
        </div>
    )

};

export default Details;