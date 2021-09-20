import React from 'react';
import { Box, Link, Container, Divider } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root:{
        textAlign:'center',
    },
    item: {
        marginTop: theme.spacing(2)
    }
}))

const Footer = (props) => {
    const classes = useStyles();
    return (
        <Box bgcolor='secondary' >
            <Container maxWidth='lg' className={classes.root} >
                <Divider></Divider>
                <Box className={classes.item}>
                    <Link href='/about'>
                    About
                    </Link>
                </Box>
                <Box className={classes.item}>
                    <Link href='/contacts'>
                    Contacts
                    </Link>
                </Box>
                <Box className={classes.item}>
                    <Link href='https://github.com/a1xg/etox'>
                    Github page
                    </Link>
                </Box>
            </Container>
        </Box>
    )
};

export default Footer;