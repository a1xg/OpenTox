import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import CSRFToken from "../csrftoken.jsx";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
        "& :visited": { color: "gray" },
        "& :hover": { color: "#44924C" },
        "& :active": { color: "gray" },
        color: 'gray'
    },
}));

const ImageForm = (props) => {
    const history = useHistory();

    const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('csrfmiddlewaretoken', CSRFToken);
        props.setQuery({
            url: 'api/image_field',
            options: { method: 'POST', body: formData }
        });

        history.push('/search-results');
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={submitForm} 
            />
            

            <label htmlFor="icon-button-file">
            <IconButton
                //color="primary"
                aria-label="upload picture"
                className={classes.button}
                component="span">
                <PhotoCamera />
            </IconButton>
            </label>
        </div>
    )
};

export default ImageForm;