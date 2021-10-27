import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{
        padding:theme.spacing(3),
        [theme.breakpoints.down('md')]:{
            padding:theme.spacing(1)
        }
    },
    box: {
        textAlign: 'center',
        display: 'flex-column',
        width: '100%',
    },
    stack: {
        paddingTop: 10,
        width: 300, 
        justifyContent: 'center',
    },
    item:{
        paddingTop:5,
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex'
    }
}));

export default useStyles;