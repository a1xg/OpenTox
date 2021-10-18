import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    legengContainer:{
        alignItems:'center', 
        justifyContent:'space-around' 
    },
    legendItem:{
        alignItems:'center'
    },
    itemBox:{
        width:'90%', 
        borderRadius:4, 
        backgroundColor: theme.palette.grey[100],
        padding:10
    },

}));

export default useStyles;