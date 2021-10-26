import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container:{
        padding:10,
    },
    title:{
        padding: 5,
        wordWrap: 'break-word'
    },
    detailsWrapper:{
        float:'right',
        width:'40vw',
        border:'1px solid lightgray', 
        borderRadius:4,
        padding:5
    },
    details:{
        
    },
    description:{
        padding:15,
        wordWrap: 'break-word',
    }
}));

export default useStyles;