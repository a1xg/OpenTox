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
    }
}))

const Footer = (props) => {
    const classes = useStyles();
    // TODO поправить длину и отцентрировать divider
    return (
            <Container maxWidth='lg' className={classes.root} >
                
                <Divider></Divider>
                <Box className={classes.item}>
                    <Link to='/about' component={NavLink}>
                    About
                    </Link>
                </Box>
                <Box className={classes.item}>
                    <Link to='/contacts' component={NavLink}>
                    Contacts
                    </Link>
                </Box>
                <Box className={classes.item}>
                    <Link href='https://github.com/a1xg/etox'  >
                    Github page
                    </Link>
                </Box>
            </Container>
    )
};

export default Footer;