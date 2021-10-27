import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Stack } from '@mui/material';
import useStyles from './styles.js';

const Footer = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth='lg' className={classes.container}>
            <Box className={classes.box}>
                <Box className={classes.item}>
                    <Divider orientation='horizontal' style={{ width: '100%' }} />
                </Box>
                <Box className={classes.item}>
                    <Stack direction='row' spacing={2} className={classes.stack}>
                        <Link to='/about' component={NavLink}>
                            About us
                        </Link>
                        <Link to='/how-use' component={NavLink}>
                            How to use
                        </Link>
                        <Link to='/contacts' component={NavLink}>
                            Contacts
                        </Link>
                    </Stack>
                </Box>
                <Box className={classes.item}>
                    <Typography variant='caption'>
                        © OpenTox 2021
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
};

export default Footer;