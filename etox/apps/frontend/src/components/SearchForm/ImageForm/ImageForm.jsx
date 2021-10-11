import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { makeStyles, Box } from '@material-ui/core';
import CSRFToken from "../csrftoken.jsx";
import DialogContainer from "./ImagePreviewEdit/DialogContainer.jsx";

// TODO очистить форму
const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(0.5),
        "& :visited": { color: theme.palette.grey[200] },
        "& :hover": { color: theme.palette.primary[300] },
        "& :active": { color: theme.palette.grey[400] },
        color: theme.palette.grey[500]
    },
}));

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
        event.preventDefault();
        setInputImage(event.target.files[0]);
        setOpenDialod(true);
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