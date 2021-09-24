import React from "react";
import { 
    TextField, 
    InputAdornment, 
    Card, CardContent, 
    CardActions, 
    Typography, 
    CardMedia,
    Box, 
    makeStyles, 
    Paper 
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        height:'100%', 
        width:'100%'
    },
    card: {

    },
    bordertop: {
        borderTop:"5px solid #44924C"
    }
}));


const ItemCard = (props) => {
    console.log('ItemCard props', props)
    const classes = useStyles();
    // TODO проверить существование title и если есть, то отобразить
    return (
        <Card className={classes.bordertop}>
            <CardContent>
            {props.title && <Typography variant='h5'>{props.title}</Typography>}
            {props.children}
           

            </CardContent>
        </Card>
    )
};

export default ItemCard;