import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import CropRotateIcon from '@mui/icons-material/CropRotate';

const useStyles = makeStyles((theme) => ({
    previewContainer:{

    },
    buttonBox: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    button: {
        backgroundColor: theme.palette.grey[50],
        "&:hover": {
            backgroundColor: theme.palette.primary[200],
        },
        '&:active': {
            backgroundColor: theme.palette.primary[400],
        },
    },
    icon:{
        color: theme.palette.grey[700],
    },
    link:{
        color: theme.palette.grey[700],
    }

}));

const ImagePreview = (props) => {
    //console.log('ImagePreview props', props)
    const classes = useStyles();
    
    const editHandler = () => {
        props.setEditPreviewSwitch(true);
    };

    return (
        <Box>
            <img src={props.base64Image} style={{ maxHeight: 300, maxWidth:400 }} />
            <Box className={classes.buttonBox}>
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