import React from 'react';
import { Grid, Box, Link, Container } from '@material-ui/core';


const Footer = (props) => {
    return (
        <Box bgcolor='secondary'>
            <Container maxWidth='lg'>
                <Box borderBottom={1}>
                    Footer
                </Box>
                <Box>
                    <Link href='/about'>
                    About
                    </Link>
                </Box>
                <Box>
                    <Link href='/contacts'>
                    Contacts
                    </Link>
                </Box>
                <Box>
                    <Link href='https://github.com/a1xg/etox'>
                    Github page
                    </Link>
                </Box>
            </Container>
        </Box>
    )
};

export default Footer;