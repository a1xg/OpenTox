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
        marginRight:theme.spacing(1)
       //alignItems: 'stretch',
    //justifyContent: 'space-between',
    },
    gridRow3:{
        //alignItems: 'stretch',
        //justifyContent: 'start',
        //marginLeft:theme.spacing(2),
        //marginRight:theme.spacing(2),
        width:'100%'
    }
}));

export default useStyles;