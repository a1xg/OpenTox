import React from "react";
import { NavLink } from "react-router-dom";
import { Button, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        width: '100%',
        backgroundColor: theme.palette.grey[50],
        "&:hover": {
            backgroundColor: theme.palette.primary[200],
        },
        '&:active': {
            backgroundColor: theme.palette.primary[400],
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.grey[700]
    },
    icon: {
        color: theme.palette.grey[700]
    }
}));

const BackButton = () => {
    const classes = useStyles();

    return (
        <Button
            xs={12}
            variant="contained"
            className={classes.button}
            startIcon={<ArrowBackIosIcon className={classes.icon} />
            }>

            <NavLink to='/search-results' className={classes.link}>
                to results
            </NavLink>
        </Button>
    )
};

export default BackButton;



