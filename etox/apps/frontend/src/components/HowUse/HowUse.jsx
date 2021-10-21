import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ItemCard from '../ItemCard/ItemCard.jsx';
import { Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import useStyles from './styles.js';

//TODO некоторые картинки пропадают при заливке на сервер, сервер отдает 404 при загрузке их
const HowUse = (props) => {
    const classes = useStyles();
    return (
        <Container>
            <ItemCard>
                <Box className={classes.root}>
                    <Typography variant='h6'>1 Take a high-quality photo of your product's ingredient list</Typography>
                    <Typography variant='body2'>
                        *Don't use flash, use natural light.
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Stack direction='row'>
                            <Box className={classes.imgContainer}>
                                <CancelIcon className={classes.iconRed} />
                                <img src='/static/images/flashlight.jpg' className={classes.image} />
                            </Box>
                            <Box className={classes.imgContainer}>
                                <CheckCircleIcon className={classes.iconGreen} />
                                <img src='/static/images/normal.jpg' className={classes.image} />
                            </Box>
                        </Stack>
                    </Paper>
                    <Typography variant='body2'>
                    * If the list of ingredients is printed on a cylindrical soft package - squeeze it so that the 
                    list of ingredients becomes flat and in focus of the camera.
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Stack direction='row'>
                            <Box className={classes.imgContainer}>
                                <CancelIcon className={classes.iconRed} />
                                <img src='/static/images/unfocus2.jpg' className={classes.image} />
                            </Box>
                            <Box className={classes.imgContainer}>
                                <CheckCircleIcon className={classes.iconGreen} />
                                <img src='/static/images/normal.jpg' className={classes.image} />
                            </Box>
                        </Stack>
                    </Paper>

                    <Typography variant='h6'>2 Upload to the site</Typography>
                    <Typography variant='body2'>
                    To speed up the search and the most accurate recognition result, we recommend cropping the image.
                    Our algorithms recognize ingredients even in uncropped photos, but this will take a little longer.
                    </Typography>
                    <Typography variant='body2'>
                    * If the text in the image is not horizontally aligned - fix it with our editor
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Stack direction='row'>
                            <Box className={classes.imgContainer}>
                                <CancelIcon className={classes.iconRed} />
                                <img src='/static/images/horizont_tilt.jpg' className={classes.image} />
                            </Box>
                            <Box className={classes.imgContainer}>
                                <CheckCircleIcon className={classes.iconGreen} />
                                <img src='/static/images/normal.jpg' className={classes.image} />
                            </Box>
                        </Stack>
                    </Paper>
                    <Typography variant='body2'>
                    * Do not crop the picture close to the text, leave a small gap.
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Stack direction='row'>
                            <Box className={classes.imgContainer}>
                                <CancelIcon className={classes.iconRed} />
                                <img src='/static/images/bad_crop.jpg' className={classes.image} />
                            </Box>
                            <Box className={classes.imgContainer}>
                                <CheckCircleIcon className={classes.iconGreen} />
                                <img src='/static/images/good_crop.jpg' className={classes.image} />
                            </Box>
                        </Stack>
                    </Paper>
                    <Typography variant='h6'>3 Click search</Typography>
                </Box>
            </ItemCard>
        </Container>
    )
};

export default HowUse;