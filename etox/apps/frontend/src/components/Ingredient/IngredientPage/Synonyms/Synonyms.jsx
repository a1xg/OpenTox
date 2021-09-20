import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Typography } from "@material-ui/core";

const Synonyms = (props) => {
    console.log('Synonyms props:', props)
    const getData = () => {
        if (props.data.ingredient.synonyms) {
            return props.data.ingredient.synonyms.eng.join('; ')    
        } else {
            return (<p>Not data</p>)
        }
    }

    return (
        <div>
            <Typography variant='h6'>Synonyms:</Typography>
            <Typography variant='body1'>{getData()}</Typography>
        </div>
    )

};

export default Synonyms;