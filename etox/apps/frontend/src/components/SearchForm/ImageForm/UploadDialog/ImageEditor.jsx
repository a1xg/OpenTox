import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Box, Button, Slider, makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CroppedImgDialog from './final.jsx';
import getCroppedImg from './cropTools.js';

const useStyles = makeStyles((theme) => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
        background: '#333',
        [theme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    button: {
        flexShrink: 0,
        marginLeft: 16,
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },

    slider: {
        padding: '22px 0px',
        marginLeft: 32,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px',
        },
    },
    icon: {
        color: theme.palette.grey[700],
    },
}));

const ImageEditor = (props) => {
    //console.log('ImageEditor props', props)
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1.7);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const classes = useStyles();
    const [inputImage, setInputImage] = useState(props.inputImage);
    const [originalImage, setOriginalImage] = useState();


    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(inputImage);
        reader.onloadend = (event) => {
            setOriginalImage(reader.result);
        }
    }, [])

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
            console.log('donee', { croppedImage });
            setCroppedImage(croppedImage);
            props.setFinalImageURL(croppedImage);
            props.closeHandler();
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation]);

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, []);

    const editHandler = () => {
        props.setEditHandler(false);
    };

    return (
        <Box>
            <Box className={classes.cropContainer}>
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
                        step={0.2}
                        aria-labelledby="Zoom"
                        className={classes.slider}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <AspectRatioIcon className={classes.icon} />
                    <Slider
                        value={aspect}
                        min={0.5}
                        max={3}
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
                    >
                        Back
                    </Button>
                    <Button
                        onClick={showCroppedImage}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Crop
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
};

export default ImageEditor;