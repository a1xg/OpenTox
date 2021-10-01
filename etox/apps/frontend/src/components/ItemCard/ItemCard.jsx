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
import { BorderRight } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        color: theme.palette.text.secondary, //
    },
    card: {
        borderTop: "5px solid lightgray",
        padding: '20px',
        'flex-grow': 1
    },
    caption: {
        color: 'lightgray'
    },
    title: {
    }
}));

const ItemCard = (props) => {
    //console.log('ItemCard props', props)
    const classes = useStyles();

    return (
        <Card className={classes.wrapper}>
            <CardContent className={classes.card} >
                {props.title && <Typography variant='h6' className={classes.title}>{props.title}</Typography>}
                {props.caption && <Typography variant='caption' className={classes.caption}>{props.caption}</Typography>}
                {props.children}
            </CardContent>
        </Card>
    )
};

export default ItemCard;