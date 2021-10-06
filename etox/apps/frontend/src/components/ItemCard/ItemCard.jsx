import React, {useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: theme.palette.text.secondary, 
        borderTop: `5px solid ${theme.palette.grey[300]}`,
        transition: "transform 0.01s ease-in-out",
        "&:hover": {
            borderTop: `5px solid ${theme.palette.primary[200]}`
        }
    },

    cardHovered: {
        transform: "scale3d(1.002, 1.002, 1)"
      },

    cardcontent: {
        padding: '20px',
        'flex-grow': 1
    },
    caption: {
        color: 'lightgray'
    },

}));

const ItemCard = (props) => {
    const [state, setState] = useState({raised:false, shadow:1})
    const classes = useStyles();

    return (
        <Card 
        className={classes.root}
        classes={{root: state.raised ? classes.cardHovered : ""}}
        onMouseOver={()=>setState({ raised: true, shadow: 1})} 
        onMouseOut={()=>setState({ raised: false, shadow: 0.5})} 
        raised={state.raised} zdepth={state.shadow}
        >
            <CardContent className={classes.cardcontent} >
                {props.title && <Typography variant='h6' >{props.title}</Typography>}
                {props.caption && <Typography variant='caption' className={classes.caption}>{props.caption}</Typography>}
                {props.children}
            </CardContent>
        </Card>
    )
};

export default ItemCard;