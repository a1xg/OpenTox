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
    const closeHandler = props.closeHandler;
    console.log('ImagePreview props', props)
    const classes = useStyles();
    const [inputImage, setInputImage] = useState(props.inputImage);
    const [preview, setPreview] = useState();

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(inputImage);
        reader.onloadend = (event) => {
            setPreview(reader.result);
        }
    }, [])

    const editHandler = () => {
        props.setEditHandler(true)
    }

    const sendHandler = () => {
        props.setFinalImageURL(inputImage);
        props.closeHandler();
    }

    return (
        <div>
            <img src={preview} style={{ height: 400 }} />
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