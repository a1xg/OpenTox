import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Stack from '@mui/material/Stack';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CropRotateIcon from '@mui/icons-material/CropRotate';
import useStyles from './styles.js';

const ImagePreview = (props) => {
    const classes = useStyles();
    const editHandler = () => {
        props.setEditPreviewSwitch(true);
    };

    return (
        <Box className={classes.gridWrapper} aria-label='gridWrapper'>
            <Grid container 
            direction='column' 
            spacing={2} 
            className={classes.previewGrid} 
            aria-label='previewGrid'
            >
                <Grid item xs={12}>
                    <Box className={classes.previewBox} aria-label='previewBox'>
                        <img src={props.base64Image} className={classes.image} />
                    </Box>
                </Grid>

                <Grid item container 
                xs={12} 
                direction='row' 
                //spacing={2} 
                className={classes.buttonGrid} 
                aria-label='buttonGrid'
                >
                    <Grid item xs={6}>
                        <Button
                            onClick={editHandler}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<CropRotateIcon className={classes.icon} />}
                        >
                            <Typography className={classes.link}>Edit</Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            onClick={props.sendHandler}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<ImageSearchIcon className={classes.icon} />}
                        >
                            <Typography className={classes.link}>Search</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ImagePreview;