import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import CSRFToken from '../csrftoken';
import ImageForm from "./ImageForm/ImageForm.jsx";
import style from './SearchForm.module.css';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const SearchForm = (props) => {
    const form = useRef(null);
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
    }

    return (
        <div>
            <form onSubmit={submitForm} ref={form}>
                <CSRFToken />
                <TextField
                    variant="outlined"
                    placeholder='Enter ingredients separated by commas'
                    name="text"
                    type="text"
                    label="Search"
                    value={undefined}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <ImageForm setQuery={props.setQuery} />
                                <IconButton
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </form>
        </div>
    )
}

export default SearchForm