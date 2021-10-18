import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles.js';

const ItemCard = (props) => {
    const [state, setState] = useState({raised:false, shadow:1})
    const classes = useStyles();

    return (
        <Card 
        className={classes.root}
        onMouseOver={()=>setState({ raised: true, shadow: 3})} 
        onMouseOut={()=>setState({ raised: false, shadow: 1})} 
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