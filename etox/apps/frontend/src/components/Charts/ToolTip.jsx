import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'sans-serif',
        display: 'flex',
        backgroundColor: theme.palette.grey[50],
        width:'70px',
        borderRadius: '2px',
        opacity: '1'
    },
    text: {
        color: theme.palette.grey[900],
    }

}));

const ToolTip = (props) => {
    console.log('CustomTooltip props:', props);
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant='caption' className={classes.text}>
            <Box sx={{
                width:'100%',
                height:'5px',
                backgroundColor: props.color
            }}>
            </Box>
                {props?.label}: <b>{props?.value}</b>{props?.caption}
            </Typography>

        </Box>
    )
};

export default ToolTip;