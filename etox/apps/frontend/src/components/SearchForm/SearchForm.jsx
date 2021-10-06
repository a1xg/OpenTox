import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, InputBase, InputAdornment, makeStyles, withStyles, alpha } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import ImageForm from "./ImageForm/ImageForm.jsx";
import CSRFtoken from './csrftoken.jsx';

const style = (theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            overflow: 'hidden',
            borderRadius: 28,
            borderColor: theme.palette.primary[800],
            backgroundColor: theme.palette.grey[50],
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            '&:hover fieldset': {
                borderColor: theme.palette.primary[300],
            },
            '&.Mui-focused': {
                backgroundColor: 'transparent',
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 4px`,
                borderColor: theme.palette.primary[100],
            },

        },
    },
});

const CssTextField = withStyles(style)(TextField);

const useStyles = makeStyles((theme) => ({
    input: {
        margin: theme.spacing(1),
        width: '600px',
    },
    button: {
        "& :visited": { color: theme.palette.secondary[200] },
        "& :hover": { color: theme.palette.primary[300] },
        "& :active": { color: theme.palette.secondary[400] },
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
    };

    return (
        <form onSubmit={submitForm} ref={form}>
            <input type="hidden" name="csrfmiddlewaretoken" value={CSRFtoken} />
            <CssTextField
                className={classes.input}
                variant="outlined"
                placeholder='Enter ingredients separated by commas'
                name="text"
                type="text"
                onChange={(event) => { setFormText(event.target.value) }}
                value={formText}
                //label="Search"
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