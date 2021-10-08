import React, { useState, useCallback } from 'react';
import { Typography, Button, Slider, makeStyles } from '@material-ui/core';
import Cropper from 'react-easy-crop';
import ImgDialog from './ImgDialog.jsx';
import getCroppedImg from './cropImage';

const useStyles = makeStyles((theme) => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
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
    sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
    },
    sliderLabel: {
        [theme.breakpoints.down('xs')]: {
            minWidth: 65,
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
}));

const dogImg =
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
                dogImg,
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
        <div>
            <div className={classes.cropContainer}>
                <Cropper
                    image={dogImg}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className={classes.controls}>
                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{ root: classes.sliderLabel }}
                    >
                        Zoom
                    </Typography>
                    <Slider
                        value={zoom}
                        min={1}
                        max={4}
                        step={0.2}
                        aria-labelledby="Zoom"
                        classes={{ root: classes.slider }}
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </div>
                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{ root: classes.sliderLabel }}
                    >
                        Aspect
                    </Typography>
                    <Slider
                        value={aspect}
                        min={0.5}
                        max={3}
                        step={0.1}
                        aria-labelledby="Acpect"
                        classes={{ root: classes.slider }}
                        onChange={(e, aspect) => setAspect(aspect)}
                    />
                </div>
                <div className={classes.sliderContainer}>
                    <Typography
                        variant="overline"
                        classes={{ root: classes.sliderLabel }}
                    >
                        Rotation
                    </Typography>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={6}
                        aria-labelledby="Rotation"
                        classes={{ root: classes.slider }}
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                </div>
                <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.cropButton }}
                >
                    Show Result
                </Button>
            </div>
            <ImgDialog img={croppedImage} onClose={onClose} />
        </div>
    )
};

export default ImageCropper;