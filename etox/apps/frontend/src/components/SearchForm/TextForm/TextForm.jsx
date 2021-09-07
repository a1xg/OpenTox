import React, { useRef } from "react";
import CSRFToken from '../../csrftoken';
import { useHistory } from "react-router-dom";
import style from '../SearchForm.module.css';
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const TextForm = (props) => {
    const form = useRef(null);
    const history = useHistory();
    const classes = useStyles();
    const submitForm = (event) => {
        event.preventDefault();
        const data = new FormData(form.current);

        props.request({
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
                />
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}

export default TextForm