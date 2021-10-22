import React from 'react';
import Typography from "@material-ui/core/Typography";
import {capitalizeJoinItems} from '../../../tools.js';

const Synonyms = (props) => {
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