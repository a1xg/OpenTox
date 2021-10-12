import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Box, Button, Slider, Typography } from '@material-ui/core';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stack from '@mui/material/Stack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import getCroppedImg from './cropTools.js';
import useStyles from './styles.js';

const ImageEditor = (props) => {
    const classes = useStyles();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1.7);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const originalImage = props.base64Image;

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                originalImage,
                croppedAreaPixels,
                rotation
            );
            props.setBase64Image(croppedImage);
            props.setCropParam(false);
            props.setEditPreviewSwitch(false);
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation]);

    const editHandler = () => {
        props.setEditPreviewSwitch(false);
    };

    return (
        <Box>
            <Box className={classes.cropBox}>
                <Cropper
                    crop={crop}
                    image={originalImage}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </Box>
            <Box className={classes.controls}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <ZoomInIcon className={classes.icon} />
                    <Slider
                        value={zoom}
                        min={1}
                        max={4}
                        step={0.1}
                        aria-labelledby="Zoom"
                        className={classes.slider}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <AspectRatioIcon className={classes.icon} />
                    <Slider
                        value={aspect}
                        min={0.2}
                        max={5}
                        step={0.1}
                        aria-labelledby="Acpect"
                        className={classes.slider}
                        onChange={(e, aspect) => setAspect(aspect)}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <AutorenewIcon className={classes.icon} />
                    <Slider
                        value={rotation}
                        min={-180}
                        max={180}
                        step={3}
                        aria-labelledby="Rotation"
                        className={classes.slider}
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                </Stack>
            
                <Stack spacing={2} direction="row" alignItems='inherit' justifyContent='space-around'>
                    <Button
                        onClick={editHandler}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ArrowBackIosNewIcon className={classes.icon} />}
                    >
                        <Typography className={classes.link}>Back</Typography>
                    </Button>
                    <Button
                        onClick={showCroppedImage}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FileDownloadDoneIcon className={classes.icon} />}
                    >
                        <Typography className={classes.link}>Save</Typography>
                    </Button>
                </Stack>
            </Box>
        </Box>

    )
};

export default ImageEditor;