import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
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