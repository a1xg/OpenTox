import React from "react";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ItemCard from '../ItemCard/ItemCard.jsx';
import { Stack } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600,
        alignItems: 'center',
    },
    content: {
        padding: 20,
        [theme.breakpoints.down('md')]: {
            padding: 20,
        }
    }
}))

const Contacts = (props) => {
    const classes = useStyles();
    return (
        <Container className={classes.wrapper}>
            <ItemCard title='Contacts'>
                <Box className={classes.content}>
                    <Stack direction='column' spacing={2} >
                        <Link href='https://github.com/a1xg/opentox'  >
                            Project page on github
                        </Link>
                        <Link href='https://www.linkedin.com/in/oleksandr-smirnov-383363150/'>
                            LinkedIn author page
                        </Link>
                    </Stack>
                </Box>
            </ItemCard >
        </Container>
    )
};

export default Contacts;