import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import useStyles from './styles.js';

const Description = (props) => {
    const classes = useStyles();
    return (
        <Box className={classes.wrapper}>
        <Typography variant='body1'>
            {props.data}
        </Typography>
        </Box>
    )
};

export default Description;

