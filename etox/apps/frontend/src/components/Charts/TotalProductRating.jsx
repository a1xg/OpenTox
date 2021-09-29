import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { ratingColorMap } from './ChartsConfig';

const TotalProductRating = (props) => {
    console.log('TotalProductRating props', props)
    return (
        props.total_rating > 0 &&
        <Box>
            <Typography variant='h6'>Total rating</Typography>
            <Typography
                variant='h3'
                style={{
                    color: ratingColorMap[Math.round(props.total_rating)]
                }}
            >
                {props.total_rating}/10
            </Typography>

        </Box>
    )
};

export default TotalProductRating;