import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import {capitalizeJoinItems} from '../../../tools.js';

const Synonyms = (props) => {
    return (
        <Box sx={{padding:10}}>
        <Typography variant='body1'>
            {capitalizeJoinItems({
                items:props.data,
                separator:'; '
            })
        }
        </Typography>
        </Box>
    )

};

export default Synonyms;