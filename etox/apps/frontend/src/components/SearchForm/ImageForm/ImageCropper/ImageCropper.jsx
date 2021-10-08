import React, { useState, useCallback } from 'react';
import { Box, Container, Button, Slider, makeStyles, List, ListItem, ListItemIcon } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import Cropper from 'react-easy-crop';
import ImgDialog from './ImgDialog.jsx';
import getCroppedImg from './cropImage';

const useStyles = makeStyles((theme) => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 400,
        background: '#333',
        [theme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
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
    wrapper: {
        alignItems: 'center',
        width: 500,
        textAlign: 'center',
    },
    cropBox: {
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '4px',
        padding: '10px',
    },
    icon: {
        color: theme.palette.grey[700],
    }, 
}));

const originalImage =
    'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

const ImageCropper = (props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1.7);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const classes = useStyles();

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
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, rotation]);

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, []);

    return (
        <Container className={classes.wrapper}>
            <Box className={classes.cropBox}>
                <Box className={classes.cropContainer}>
                    <Cropper
                        image={originalImage}
                        crop={crop}
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
                    <Button
                        onClick={showCroppedImage}
                        variant="contained"
                        color="primary"
                        className={classes.cropButton}
                    >
                        Crop
                    </Button>
                </Box>
                <ImgDialog img={croppedImage} onClose={onClose} />
            </Box>
        </Container>
    )
};

export default ImageCropper;