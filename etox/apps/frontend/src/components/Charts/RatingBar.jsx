import React from 'react';
//import './RatingBar.css';
import { Box, Grid, Tooltip } from '@material-ui/core';
import { ratingBarColorMap } from './ChartsConfig';
import { makeStyles } from '@material-ui/core';
import { BorderBottom } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    row: {
        'display': 'flex',
        'flex-wrap': 'wrap',
        'flex-direction': 'row',
        'justify-content': 'start',
        'align-items': 'auto',
        'align-content': 'start',
        background:'gray',
        borderRadius:'4px'
     },
    column:{
        width:'10%',
        height:'10px',  
        background:'light-gray',
    },
    item: {
        width:'100%',
        height:'100%',
        borderRadius:'2px'
    },
}))

// !TODO перенести рейтинг бары на nivo или SVG, в стиле segmented progress bar
const RatingBar = (props) => {
    console.log('RatingBar props', props)
    const classes = useStyles();

    const rating = Math.round(props.rating);

    const getRectangles = (props) => {
        let rects = []
        for (let i = 1; i <= 10; i++) {
            rects.push(
                <Tooltip title={i}>
                    <Box className={classes.column} >
                        {i <= rating &&
                            <Box className={classes.item} style={{ background: ratingBarColorMap[i] }}>
                            </Box>
                        }
                    </Box>
                </Tooltip>
            );
        };
        return rects;
    };
    const rects = getRectangles();
    console.log('getRectangles', rects);
    //!TODO переделать черт на серый прямоугольник, в который будут вписаны 10 малых прямоугольников с паддингами
    return (
        <div className={classes.row}>
            {rects.map((rect) => {
                return rect
            })}
        </div>
    );
};

export default RatingBar;
