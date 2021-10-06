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
        borderTop: `5px solid ${theme.palette.grey[300]}`,
        "&:hover": {
            borderTop: `5px solid ${theme.palette.primary[200]}`
        }
    },
    cardcontent: {
        padding: '20px',
        'flex-grow': 1
    },
    caption: {
        color: theme.palette.grey[400]
    },
    title: {
        color: theme.palette.grey[700]
    }

}));

const ItemCard = (props) => {
    const [state, setState] = useState({raised:false, shadow:1})
    const classes = useStyles();

    return (
        <Card 
        className={classes.root}
        onMouseOver={()=>setState({ raised: true, shadow: 1})} 
        onMouseOut={()=>setState({ raised: false, shadow: 0.5})} 
        raised={state.raised} zdepth={state.shadow}
        >
            <CardContent className={classes.cardcontent} >
                {props.title && <Typography variant='h6' className={classes.title} >{props.title}</Typography>}
                {props.caption && <Typography variant='caption' className={classes.caption} >{props.caption}</Typography>}
                {props.children}
            </CardContent>
        </Card>
    )
};

export default ItemCard;