import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
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
        <Box>
            <Box className={classes.previewBox}>
                <img src={props.base64Image} className={classes.image} />
            </Box>
            <Box className={classes.controls}>
                <Stack spacing={2} direction="row" alignItems='inherit' justifyContent='space-around'>
                    <Button
                        onClick={editHandler}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<CropRotateIcon className={classes.icon} />}
                    >
                        <Typography className={classes.link}>Edit</Typography>
                    </Button>
                    <Button
                        onClick={props.sendHandler}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ImageSearchIcon className={classes.icon} />}
                    >
                        <Typography className={classes.link}>Search</Typography>
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
};

export default ImagePreview;