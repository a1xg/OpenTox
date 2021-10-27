import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Box from '@material-ui/core/Box';
import CSRFToken from "../csrftoken.jsx";
import DialogContainer from "./ImagePreviewEdit/DialogContainer.jsx";
import useStyles from "./styles.js";

// TODO очистить форму

const ImageForm = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const [inputImage, setInputImage] = useState(null);
    const [finalImage, setFinalImage] = useState(null);
    const [openDialog, setOpenDialod] = useState(false);
    // crop - boolean parameter that determines the need or unnecessary cropping of the image on the server
    const [cropParam, setCropParam] = useState(true); 

    useEffect(() => {
        if (finalImage != null) {
            submitForm();
            closeHandler();
        };
    }, [finalImage]);

    const openHandler = (event) => {
        setInputImage(event.target.files[0]);
        setOpenDialod(true);
        event.preventDefault();
    };

    const closeHandler = (props) => {
        setInputImage(null);
        setFinalImage(null);
        setOpenDialod(false);
        setCropParam(true);
    };

    const submitForm = (event) => {
        const formData = new FormData();
        formData.append('image', finalImage);
        formData.append('csrfmiddlewaretoken', CSRFToken);
        formData.append('crop', cropParam);
        
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
                onChange={openHandler}
            />
            <label htmlFor="icon-button-file">
            <IconButton
                    aria-label="upload picture"
                    className={classes.button}
                    component="span">
                    <ImageSearchIcon />
                </IconButton>
            </label>
            {inputImage != null && 
            <DialogContainer
                inputImage={inputImage}
                openDialog={openDialog}
                setFinalImage={setFinalImage}
                closeHandler={closeHandler}
                setCropParam={setCropParam}
            />
            }
        </Box>
    )
};

export default ImageForm;