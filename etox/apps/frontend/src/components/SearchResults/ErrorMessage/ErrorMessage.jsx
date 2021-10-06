import React from 'react';
import { Container, Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderTop: `4px solid ${theme.palette.error.light}`,
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius:'4px',
        alignItems: 'center',
        width: 600,
        textAlign: 'center',
        padding: '10px'

    },
    title: {
        color: theme.palette.error.light,
        textAlign:'left'
    },
    errormessage: {
        color: theme.palette.grey[700]
    }
}))

const ErrorMessage = (props) => {
    const classes = useStyles();
    return (
        <Container className={classes.wrapper}>
            <Box>
            <Typography variant='h6' className={classes.title}>
                Error
            </Typography>
            </Box>
            <Box>
                <Typography variant='body1' className={classes.errormessage}>
                    Sorry, ingredients not found...
                </Typography>
            </Box>
        </Container>
    )
};

export default ErrorMessage;