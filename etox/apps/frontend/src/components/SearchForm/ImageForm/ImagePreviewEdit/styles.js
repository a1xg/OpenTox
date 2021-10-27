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
    gridWrapper:{
        maxHeight:'70vh'
    },
    previewGrid:{
        alignItems: 'stretch',
        justifyContent: 'center'    
    },
    editGrid:{
        alignItems: 'stretch',
        justifyContent: 'center'    
    },
    buttonGrid:{
        width:'100%',
        justifyContent: 'space-around',  
        alignItems: 'center',        
        [theme.breakpoints.down('md')]:{
            height:'4vh'
        }
    },
    previewBox: {
        position: 'relative',
        width: 500,
        height:'100%',
        background: theme.palette.grey[300],
        [theme.breakpoints.down('md')]: {
            width: '100%', 
            maxHeight: '40vh'
        }
    },
    instructionBox:{
        width:500,
        textAlign:'left',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        }
    },
    cropBox: {
        position: 'relative',
        width: 500,
        height: '40vh',
        background: theme.palette.grey[300],
        [theme.breakpoints.down('md')]: {
            width: '100%',
            maxHeight:'40vh'
        }
    },
    sliderBox: {
        height:'4vh',
        [theme.breakpoints.down('md')]: {
            maxWidth: '100%',
            height:'4vh'
        }
    },
    image: {
        maxHeight: '40vh',
        maxWidth:'100%',
    },
    button: {
        width:'calc(100% - 16px)',
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