import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { ratingColorMap } from './ChartsConfig';

//TODO сделать вывод различного рейтинга для ингредиентов с классом NO_DATA_AVAILABLE и кодами (Not Classified | NA).

const getRectangleColors = (rating) => {
    let colors = [];
    for (let i = 1; i <= 10; i++) {
        let color = (i <= rating ? ratingColorMap[i] : 'rgb(245, 243, 243)')
        colors.push(color);
    };
    return colors;
};

const IngredientRatingBar = (props) => {
    console.log('RatingBar props', props)
    const rating = Math.round(props.rating);
    const colors = getRectangleColors(rating);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            borderRadius: '4px',
            border: '1px solid lightgray',
            padding: '3px',
            width: props.width,
            height: props.height
        }}
        >
            {colors.map((color, index) => {
                return (
                    <Tooltip title={index + 1} key={index}>
                        <Box
                            sx={{
                                opacity: '0.8',
                                borderRadius: '2px',
                                width: props.width*0.08,
                                height: props.height,
                                backgroundColor: color,
                            }}
                        >
                        </Box>
                    </Tooltip>
                )
            })}
        </Box>
    );
};

export default IngredientRatingBar;
