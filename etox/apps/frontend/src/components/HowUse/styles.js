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
        marginLeft:120,
        marginRight:120,
        [theme.breakpoints.down('md')]: {
            padding: 5,
            marginTop: 5,
            marginBottom: 5,
            marginLeft:0,
            marginRight:0,
        }
    },
    galleryWrapper:{
        width:'600px',
        [theme.breakpoints.down('md')]:{
            width:'90vw',
        }
    },
}));

export default useStyles;

