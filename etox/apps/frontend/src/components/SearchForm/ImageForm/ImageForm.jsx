import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import style from '../SearchForm.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const ImageForm = (props) => {
    const history = useHistory();

    const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        props.setQuery({
            url: 'api/image_field',
            options: { method: 'POST', body: formData }
        });

        history.push('/search-results');
    };
    const classes = useStyles();

    return (
        <div>
            <input className={classes.input} id="icon-button-file" type="file" onChange={submitForm} />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
        </div>
    )
};

export default ImageForm