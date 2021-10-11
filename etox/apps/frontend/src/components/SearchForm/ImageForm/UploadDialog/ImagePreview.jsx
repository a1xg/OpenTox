import React, { useEffect, useState } from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles((theme) => ({
    buttonBox: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    button: {

    }
}));

const ImagePreview = (props) => {
    console.log('ImagePreview props', props)
    const classes = useStyles();
    
    const editHandler = () => {
        props.setEditPreviewSwitch(true);
    }

    const sendHandler = () => {
        props.setFinalImage(props.base64Image);
        props.closeHandler();
    }

    return (
        <div>
            <img src={props.base64Image} style={{ height: 400 }} />
            <Box className={classes.buttonBox}>
                <Stack spacing={2} direction="row" alignItems='inherit' justifyContent='space-around'>
                    <Button
                        onClick={sendHandler}
                        variant="contained"
                        color="primary"
                        className={classes.button} >
                        Send
                    </Button>
                    <Button
                        onClick={editHandler}
                        variant="contained"
                        color="primary"
                        className={classes.button} >
                        Edit
                    </Button>
                </Stack>
            </Box>
        </div>
    )
};

export default ImagePreview;