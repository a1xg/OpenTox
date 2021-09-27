import React from 'react';
import { Box, Grid, Tooltip, makeStyles } from '@material-ui/core';
import { ratingColorMap } from './ChartsConfig';
import { BorderBottom } from '@material-ui/icons';
import './IngredientRatingBar.css'

//TODO сделать вывод различного рейтинга для ингредиентов с классом NO_DATA_AVAILABLE и кодами (Not Classified | NA).

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
        let color = (i <= rating ? ratingColorMap[i] : 'rgb(240, 234, 234)')
        colors.push(color);
    };
    return colors;
};
//TODO довести до ума стили
const IngredientRatingBar = (props) => {
    console.log('RatingBar props', props)
    //const classes = useStyles();
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

export default IngredientRatingBar;
