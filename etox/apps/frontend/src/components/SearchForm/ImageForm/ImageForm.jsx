import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import CSRFToken from "../csrftoken.jsx";
// TODO сделать кроппер изображений?
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