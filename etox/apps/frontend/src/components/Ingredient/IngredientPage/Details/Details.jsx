import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

//TODO отрефакторить код: переписать на компонентах Material UI, возможно на компоненте Table
const Details = (props) => {
    console.log('Details props', props);

    return (
        <div>
            <Typography variant='body1'>
            CAS numbers {props.data.ingredient.cas_numbers.join(', ')}
            </Typography>
            <Typography variant='body1'>
            Colour Index number (CI) {props.data.ingredient.colour_index}
            </Typography>
            <Typography variant='body1'>
            EC numbers {props.data.ingredient.ec_numbers.join(', ')}
            </Typography>
            <Typography variant='body1'>
            Functions {props.data.ingredient.functions.join(', ')}
            </Typography>
            <Typography variant='body1'>
            PubChem page {props.data.ingredient.pubchem_cid}
            </Typography>
            <Typography variant='body1'>
            Request statistics {props.data.ingredient.request_statistics} 
            </Typography>
            
        </div>
    )

};

export default Details;