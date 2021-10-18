import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: 'center',
        padding: 50,
        justifyItems: 'space-around'
    },
    paper: {
        backgroundColor: theme.palette.grey[100],
        padding: 15,
        display: 'table',
        marginTop: 20,
        marginBottom:20
    },
    imgContainer: {
        position: 'relative',
        padding: 4,
        borderRadius: 4,
        width:'100%',
        height:'100%'
    },
    image: {
        maxWidth: '100%',
        maxHeight:'100%'
    },
    iconRed: {
        opacity: 0.8,
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'transparency',
        color: '#ff0000',
    },
    iconGreen: {
        opacity: 0.8,
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'transparency',
        color: '#3afe03',
    },
}));

export default useStyles;

