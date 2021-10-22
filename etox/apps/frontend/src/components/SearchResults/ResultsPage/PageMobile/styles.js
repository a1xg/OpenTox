import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container:{ 
        alignItems: 'center',
        height:'100%',
        paddingLeft:0,
        paddingRight:0,
    },
    gridCol:{
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    gridRow1:{
        alignItems: 'stretch',
        justifyContent: 'space-around',
        height:'100%',
    },
    gridRow2:{
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
    },
    gridRow3:{
        alignItems: 'stretch',
        justifyContent: 'space-around',
        width: 'calc(100% - 16px)'
    }
}));

export default useStyles;