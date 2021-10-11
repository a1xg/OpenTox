import React, { useState, useEffect } from 'react';
import { Box, Dialog, Container, makeStyles } from '@material-ui/core';
import ImagePreview from './ImagePreview.jsx';
import ImageEditor from './ImageEditor.jsx';

const useStyles = makeStyles((theme) => ({
    container: {
        alignItems: 'center',
        width: 500,
        textAlign: 'center',
    },
    wrapper: {
        width: 400,
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 4,
        padding: 15,
    },

}));

const base64decode = (dataURL) => {
    let arr = dataURL.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    };

    let image = new File([u8arr], 'croppedImage.jpg', { type: mime });
    return image
};

const UploadDialog = (props) => {
    console.log('UploadDialog props', props);
    const classes = useStyles();
    const [editPreviewSwitch, setEditPreviewSwitch] = useState(false);
    const [base64Image, setBase64Image] = useState();
    
    const sendHandler = () => {
        const imageFile = base64decode(base64Image);
        props.setFinalImage(imageFile);
        props.closeHandler();
    };

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(props.inputImage);
        reader.onloadend = () => {
            setBase64Image(reader.result);
        };
    }, [props.inputImage]);

    return (
        <Dialog open={props.openDialog} onClose={props.closeHandler}>
            <Container className={classes.container}>
                <Box className={classes.wrapper}>
                    {editPreviewSwitch == false &&
                        <ImagePreview
                            base64Image={base64Image}
                            setEditPreviewSwitch={setEditPreviewSwitch}
                            sendHandler={sendHandler}
                        />
                    }
                    {editPreviewSwitch == true &&
                        <ImageEditor
                            base64Image={base64Image}
                            setEditPreviewSwitch={setEditPreviewSwitch}
                            setBase64Image={setBase64Image}
                            setCrop={props.setCrop}
                        />
                    }
                </Box>
            </Container>
        </Dialog>
    )
};

export default UploadDialog;