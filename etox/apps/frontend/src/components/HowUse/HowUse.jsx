import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ItemCard from '../ItemCard/ItemCard.jsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Gallery from "react-grid-gallery";
import useStyles from './styles.js';
import IMAGES from './images.js';

const HowUse = () => {
    const classes = useStyles();
    return (
        <Container className={classes.wrapper}>
            <ItemCard>
                <Box className={classes.box}>
                    <Typography variant='h5'>Take a high-quality photo of your product's ingredient list</Typography>
                    <Typography variant='body2'>
                        *Don't use flash, use natural light.
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Box className={classes.galleryWrapper}>
                            <Gallery
                                images={IMAGES.flashlight}
                                enableLightbox={true}
                                maxRows={2}
                                backdropClosesModal

                            />
                        </Box>
                    </Paper>
                    <Typography variant='body2'>
                        * If the list of ingredients is printed on a cylindrical soft package - squeeze it so that the
                        list of ingredients becomes flat and in focus of the camera.
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Box className={classes.galleryWrapper}>
                            <Gallery
                                images={IMAGES.unfocus}
                                enableLightbox={true}
                                maxRows={2}
                                backdropClosesModal
                            />
                        </Box>
                    </Paper>
                    <Typography variant='h5'>Upload to the site</Typography>
                    <Typography variant='body2'>
                        To speed up the search and the most accurate recognition result, we recommend to crop the image.
                        Our algorithms recognize ingredients even in uncropped photos, but this will take a little longer.
                    </Typography>
                    <Typography variant='body2'>
                        * If the text in the image is not horizontally aligned - fix it with our editor
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Box className={classes.galleryWrapper}>
                            <Gallery
                                images={IMAGES.horizontal}
                                enableLightbox={true}
                                maxRows={2}
                                backdropClosesModal
                            />
                        </Box>
                    </Paper>
                    <Typography variant='body2'>
                        * Do not crop the picture close to the text, leave a small gap.
                    </Typography>
                    <Paper elevation={4} className={classes.paper}>
                        <Box className={classes.galleryWrapper}>
                            <Gallery
                                images={IMAGES.crop}
                                enableLightbox={true}
                                maxRows={2}
                                backdropClosesModal
                            />
                        </Box>
                    </Paper>
                    <Typography variant='h5'>Click search</Typography>
                </Box>
            </ItemCard>
        </Container>
    )
};

export default HowUse;