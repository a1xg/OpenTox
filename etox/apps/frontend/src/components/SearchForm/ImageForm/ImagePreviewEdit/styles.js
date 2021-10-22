import React from 'react';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    dialog:{
        '& .MuiDialog-paper': {
            margin: 0
        },
        '& .MuiDialog-paperFullWidth':{
            width:'calc(100% - 16px)'
        }
    },
    dialogContainer: {
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: theme.spacing(1),
        backgroundColor: theme.palette.grey[50],
    },
    previewGrid:{
        alignItems: 'center',
    },

    buttonGrid:{
        width:'100%'
    },
    previewBox: {
        position: 'relative',
        width: 500,
        height:'100%',
        background: theme.palette.grey[900],
        [theme.breakpoints.down('md')]: {
            width: '100%', 
        }
    },
    cropBox: {
        position: 'relative',
        width: 500,
        height: '50vh',
        background: theme.palette.grey[900],
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    image: {
        maxHeight: '70vh',
        maxWidth:'100%',
    },
    controls: {
        paddingTop: 5,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
        }
    },
    button: {
        width: '100%',
        backgroundColor: theme.palette.grey[100],
        "&:hover": {
            backgroundColor: theme.palette.primary[200],
        },
        '&:active': {
            backgroundColor: theme.palette.primary[400],
        },
    },
    icon: {
        color: theme.palette.grey[700],
    },
    link: {
        color: theme.palette.grey[700],
    },
    slider: {
        padding: '20px 0px',
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