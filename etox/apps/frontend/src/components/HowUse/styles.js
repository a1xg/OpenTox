import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    wrapper:{
        paddingLeft:theme.spacing(1),
        paddingRight:theme.spacing(1)
    },
    box: {
        alignItems: 'center',
        padding: 50,
        [theme.breakpoints.down('md')]: {
            padding: 5,
        },
        justifyItems: 'space-around'
    },
    paper: {
        backgroundColor: theme.palette.grey[100],
        padding: 15,
        display: 'table',
        marginTop: 20,
        marginBottom: 20,
        [theme.breakpoints.down('md')]: {
            padding: 5,
            marginTop: 5,
            marginBottom: 5,
        }
    },
    galleryWrapper:{
        width:'50vw',
        height:100, 
        [theme.breakpoints.down('md')]:{
            width:'90vw',
        }
    },
    iconRed: {
        opacity: 0.8,
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'transparency',
        color: '#ff0000',
        [theme.breakpoints.down('md')]:{
            top: 8,
            right: 8,
        }
    },
    iconGreen: {
        opacity: 0.8,
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'transparency',
        color: '#3afe03',
        [theme.breakpoints.down('md')]:{
            top: 8,
            right: 8,
        }
    },
}));

export default useStyles;

