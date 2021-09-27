import React from "react";
import { 
    Card, 
    CardContent, 
    CardActions, 
    CardMedia,
    Typography, 
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
        borderTop:"5px solid lightgray"
    },
    caption : {
        color:'lightgray'
    },
    title: {

    }
}));


const ItemCard = (props) => {
    console.log('ItemCard props', props)
    const classes = useStyles();

    return (
        <Card className={classes.bordertop}>
            <CardContent>
            {props.title && <Typography variant='h6'  className={classes.title}>{props.title}</Typography>}
            {props.caption && <Typography variant='caption' className={classes.caption}>{props.caption}</Typography>}
            {props.children}
            </CardContent>
        </Card>
    )
};

export default ItemCard;