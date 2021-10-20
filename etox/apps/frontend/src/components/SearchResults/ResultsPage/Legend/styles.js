import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grid:{
        margin:5,
    },
    gridItem:{
        height: '100%',
        borderRadius:4, 
        backgroundColor: theme.palette.grey[100],
    },
    stackWrapper:{
        padding: 5
    },
    legendItem:{
        alignItems:'center'
    },

}));

export default useStyles;