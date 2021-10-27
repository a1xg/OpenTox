import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles.js';

const ErrorMessage = (props) => {
    const classes = useStyles();
    return (
        <Container className={classes.wrapper}>
            <Box className={classes.box}>
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
            </Box>
        </Container>
    )
};

export default ErrorMessage;