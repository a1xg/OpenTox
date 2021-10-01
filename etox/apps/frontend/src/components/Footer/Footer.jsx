import React from 'react';
import { Box, Link, Container, Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root:{
        textAlign:'center',
    },
    item: {
        marginTop: theme.spacing(1)
    },
    link:{
        textDecoration:'none'
    }
}))

const Footer = (props) => {
    const classes = useStyles();
    return (
            <Container maxWidth='lg' className={classes.root} >
                <Divider></Divider>
                <Box className={classes.item}>
                    <NavLink to='/about' className={classes.link}>
                    About
                    </NavLink>
                </Box>
                <Box className={classes.item}>
                    <NavLink to='/contacts' className={classes.link}>
                    Contacts
                    </NavLink>
                </Box>
                <Box className={classes.item}>
                    <Link href='https://github.com/a1xg/etox' underline='hover'>
                    Github page
                    </Link>
                </Box>
            </Container>
    )
};

export default Footer;