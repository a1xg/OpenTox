import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Typography } from "@material-ui/core";

const Synonyms = (props) => {
    console.log('Synonyms props:', props)

    return (
        <Typography variant='body1'>
            {props.data.ingredient.synonyms != null && 
            props.data.ingredient.synonyms.eng != null && 
            props.data.ingredient.synonyms.eng.join('; ')}
        </Typography>
    )

};

export default Synonyms;