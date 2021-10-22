import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Stack from '@mui/material/Stack';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import getCroppedImg from './cropTools.js';
import useStyles from './styles.js';
// TODO переделать верстку, сделать адаптивной
const ImageEditor = (props) => {
    const classes = useStyles();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1.7);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                props.base64Image,
                croppedAreaPixels,
                rotation
            );
            props.setBase64Image(croppedImage);
            props.setCropParam(false);
            props.setEditPreviewSwitch(false);
        } catch (e) {
            //console.error(e)
        }
    }, [croppedAreaPixels, rotation]);

    const editHandler = () => {
        props.setEditPreviewSwitch(false);
    };

    return (
        <Grid container direction='column' spacing={2} >
            <Grid item >
                <Box className={classes.cropBox}>
                    <Cropper
                        crop={crop}
                        image={props.base64Image}
                        rotation={rotation}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onRotationChange={setRotation}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </Box>
            </Grid>

            <Grid item>
                <Stack spacing={2} direction="row" alignItems="center">
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
            </Grid>
            <Grid item>
                <Stack spacing={2} direction="row" alignItems="center">
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
            </Grid>

            <Grid item>
                <Stack spacing={2} direction="row" alignItems="center">
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
            </Grid>

            <Grid item container direction='row' spacing={2} className={classes.buttonGrid}>
                <Grid item xs={6}>
                    <Button
                        onClick={editHandler}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ArrowBackIosNewIcon className={classes.icon} />}
                    >
                        <Typography className={classes.link}>Back</Typography>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        onClick={showCroppedImage}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FileDownloadDoneIcon className={classes.icon} />}
                    >
                        <Typography className={classes.link}>Save</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default ImageEditor;