import React from 'react';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    dialogContainer: {
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: theme.palette.grey[50],
    },
    previewBox: {
        position: 'relative',
        width: 500,
        maxHeight:400,
        background: theme.palette.grey[900],
    },
    cropBox:{
        position: 'relative',
        width:500,
        height:400,
        background: theme.palette.grey[900],
    },
    image:{
        maxWidth:'100%',
        maxHeight:400,
    },
    controls: {
        paddingTop: 25,
        paddingBottom:5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    button: {
        width:'100%',
        backgroundColor: theme.palette.grey[100],
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
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 32,
        color: theme.palette.primary[400],
        height: 5,
        '& .MuiSlider-rail': {
            opacity: 0.8,
            backgroundColor: theme.palette.grey[400],
        },
    },
}));

export default useStyles;