import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root:{
        alignItems: 'center',
    },
    topGrid: {
        flexGrow: 1,
        width: "100%",
        justifyContent: 'space-around',
    },
    col1: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        height:'100%'
    },
    col2: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        height:'100%'
    },
    col2row:{
        alignItems: 'center'
    },
    bottomGrid:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        }
}));

export default useStyles;