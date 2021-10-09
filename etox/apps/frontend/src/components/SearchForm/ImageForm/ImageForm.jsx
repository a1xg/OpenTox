import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles, Box } from '@material-ui/core';
import CSRFToken from "../csrftoken.jsx";
import UploadDialog from "./UploadDialog/UploadDialog.jsx";

//! при простой отправке изображения на сервер в Network form data отправляется: (binary); csrfmiddlewaretoken: токен
//!
//!
//!
//!
//!
//!

const base64toImage = (cropImg) => {
    //let cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    let arr = cropImg.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    let imageCrop = new File([u8arr], 'imagename.jpg', { type: mime });
    return imageCrop
}


const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
        "& :visited": { color: theme.palette.grey[200] },
        "& :hover": { color: theme.palette.primary[300] },
        "& :active": { color: theme.palette.grey[400] },
        color: theme.palette.grey[500]
    },
}));


const ImageForm = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [inputImage, setInputImage] = useState();
    const [open, setOpen] = useState(false);
    const [finalImageURL, setFinalImageURL] = useState(null);

    useEffect(() => {
        if (finalImageURL != null) {
            submitForm();
        };
    }, [finalImageURL])

    const closeHandler = (props) => {
        setOpen(false);
    };

    const openDialog = (event) => {
        setInputImage(event.target.files[0]);
        setOpen(true);
    };

    const submitForm = (event) => {
        //event.preventDefault();
        const formData = new FormData();
        const img = base64toImage(finalImageURL);
        formData.append('image', img);
        //formData.append('image', event.target.files[0]);
        formData.append('csrfmiddlewaretoken', CSRFToken);
        props.setQuery({
            url: 'api/image_field',
            options: { method: 'POST', body: formData }
        });

        history.push('/search-results');
    };

    return (
        <Box className={classes.root}>
            <input
                className={classes.input}
                id="icon-button-file"
                type="file"
                //onChange={submitForm} 
                onChange={openDialog}
            />

            <label htmlFor="icon-button-file">
                <IconButton
                    aria-label="upload picture"
                    className={classes.button}
                    component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <UploadDialog
                inputImage={inputImage}
                open={open}
                closeHandler={closeHandler}
                setFinalImageURL={setFinalImageURL}
            />
        </Box>
    )
};

export default ImageForm;