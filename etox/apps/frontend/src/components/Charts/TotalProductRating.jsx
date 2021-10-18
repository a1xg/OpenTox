import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ratingColorMap } from './ChartsConfig';

const TotalProductRating = (props) => {
    return (
        props.total_rating > 0 &&
        <Box sx={{
            position: "absolute",
            top: 0,
            right: props.margin.right,
            bottom: 0,
            left: props.margin.left,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            pointerEvents: "none",
        }}
        >
            <Typography variant='subtitle1'>Total rating</Typography>
            <Typography
                variant='h4'
                style={{
                    color: ratingColorMap[Math.round(props.total_rating)]
                }}
            >
                {`${props.total_rating}/10`}
            </Typography>
        </Box>
    )
};

export default TotalProductRating;