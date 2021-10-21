import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grid:{
        margin:5,
    },    
    gridItem: {
        borderRadius: 4,
        backgroundColor: theme.palette.grey[100],
        height: '100%',
    },    
    stack: {
        alignItems: 'center',
        textAlign: 'left',
    },
    stackWrapper:{
        padding: 5
    }
}));

export default useStyles;