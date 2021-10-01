import React from "react";
import { NavLink } from "react-router-dom";
import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        width: '100%',
        background: 'white',
    },
    link: {
        textDecoration: 'none',
    }
}));

const BackButton = () => {
    const classes = useStyles();

    return (
        <Button
            xs={12}
            variant="contained"
            className={classes.button}
            startIcon={<ArrowBackIosIcon />
            }>
            <NavLink to='/search-results' className={classes.link}>
                Back to search results
            </NavLink>
        </Button>

    )
};

export default BackButton;



