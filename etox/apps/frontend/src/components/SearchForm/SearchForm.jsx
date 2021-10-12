import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import ImageForm from "./ImageForm/ImageForm.jsx";
import CSRFtoken from './csrftoken.jsx';
import useStyles from './styles.js';

const SearchForm = (props) => {
    const [formText, setFormText] = useState('')
    const form = useRef(undefined);
    const history = useHistory();
    const classes = useStyles();

    const submitForm = (event) => {
        event.preventDefault();
        const data = new FormData(form.current);
        props.setQuery({
            url: 'api/text_field',
            options: { method: 'POST', body: data }
        });
        history.push('/search-results');
        setFormText('');
    };

    return (
        <form onSubmit={submitForm} ref={form}>
            <input type="hidden" name="csrfmiddlewaretoken" value={CSRFtoken} />
            <TextField
                className={classes.input}
                variant="outlined"
                placeholder='Enter ingredients separated by commas'
                name="text"
                type="text"
                onChange={(event) => { setFormText(event.target.value) }}
                value={formText}
                InputProps={{
                    maxLength: 500,
                    endAdornment: (
                        <InputAdornment position="end">
                            <ImageForm setQuery={props.setQuery} />
                            <IconButton
                                type="submit"
                                className={classes.button}
                            >
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </form>
    )
}

export default SearchForm