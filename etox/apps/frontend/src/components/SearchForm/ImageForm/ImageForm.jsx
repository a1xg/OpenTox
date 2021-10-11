import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles, Box } from '@material-ui/core';
import CSRFToken from "../csrftoken.jsx";
import UploadDialog from "./UploadDialog/UploadDialog.jsx";


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
    const [inputImage, setInputImage] = useState(null);
    const [finalImage, setFinalImage] = useState(null);
    const [openDialog, setOpenDialod] = useState(false);

    useEffect(() => {
        if (finalImage != null) {
            submitForm();
            setInputImage(null);
            setFinalImage(null);
            setOpenDialod(false);
        };
        console.log('finalImage', finalImage)
    }, [finalImage]);

    const openHandler = (event) => {
        event.preventDefault();
        setInputImage(event.target.files[0]);
        setOpenDialod(true);
    };

    const closeHandler = (props) => {
        setOpenDialod(false);
        setInputImage(null);
    };

    const submitForm = (event) => {
        const formData = new FormData();
        formData.append('image', finalImage);
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
                onChange={openHandler}
            />
            <label htmlFor="icon-button-file">
                <IconButton
                    aria-label="upload picture"
                    className={classes.button}
                    component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            {inputImage != null && 
            <UploadDialog
                inputImage={inputImage}
                openDialog={openDialog}
                setFinalImage={setFinalImage}
                closeHandler={closeHandler}
            />
            }
        </Box>
    )
};

export default ImageForm;