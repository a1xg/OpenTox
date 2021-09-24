import React from 'react';
import { Box, Grid, Tooltip, makeStyles } from '@material-ui/core';
import { ratingBarColorMap } from './ChartsConfig';
import { BorderBottom } from '@material-ui/icons';
import './RatingBar.css'


const useStyles = makeStyles((theme) => ({
    row: {
        'display': 'flex',
        'flex-wrap': 'wrap',
        'flex-direction': 'row',
        'justify-content': 'start',
        'align-items': 'auto',
        'align-content': 'start',
        background: 'gray',
        borderRadius: '4px'
    },
    column: {
        width: '10%',
        height: '10px',
        background: 'light-gray',
    },
    item: {
        width: '100%',
        height: '100%',
        borderRadius: '2px'
    }
}))

const getRectangleColors = (rating) => {
    let colors = []
    for (let i = 1; i <= 10; i++) {
        let color = (i <= rating ? ratingBarColorMap[i] : 'rgb(240, 234, 234)')
        colors.push(color);
    };
    return colors;
};
//TODO довести до ума стили
const RatingBar = (props) => {
    console.log('RatingBar props', props)
    const classes = useStyles();
    const rating = Math.round(props.rating);
    const colors = getRectangleColors(rating);
    return (
        <div className='grid-container'>
            {colors.map((color, index) => {
                return (
                    <Tooltip title={index+1} key={index}>
                        <div className='grid-item' style={{ background: color }}>
                        </div>
                    </Tooltip>
                )
            })}
        </div>
    );
};

export default RatingBar;
