import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, InputAdornment } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import ImageForm from "./ImageForm/ImageForm.jsx";
import CSRFtoken from './csrftoken.jsx';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'lightgray',
                borderRadius: `28px`,
            },
            '&:hover fieldset': {
                borderColor: '#44924C',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#44924C',
            },
        },
    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(1),
        width:600,
    },
    button: {
        "& :visited": { color: "gray" },
        "& :hover": { color: "#44924C" },
        "& :active": { color: "gray" },
        color: 'gray'
    }
}));

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
    }  ;

    return (
        <form onSubmit={submitForm} ref={form}>
             <input type="hidden" name="csrfmiddlewaretoken" value={CSRFtoken} />
            <CssTextField
                className={classes.input}
                variant="outlined"
                placeholder='Enter ingredients separated by commas'
                name="text"
                type="text"
                onChange={(event) => {setFormText(event.target.value)}}
                value={formText}
                label="Search"
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