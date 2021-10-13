import React from 'react';
import { Typography } from "@material-ui/core";
import capitalizeJoinItems from '../../tools.js';

const Synonyms = (props) => {
    console.log('Synonyms props:', props)

    return (
        <Typography variant='body1'>
            {capitalizeJoinItems({
                items:props.data,
                separator:';'
            })
        }
        </Typography>
    )

};

export default Synonyms;