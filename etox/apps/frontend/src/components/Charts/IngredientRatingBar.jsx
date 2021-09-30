import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ratingColorMap } from './ChartsConfig';

const getRectangleColors = (rating) => {
    let colors = [];
    for (let i = 1; i <= 10; i++) {
        let color = (i <= rating ? ratingColorMap[i] : 'rgb(245, 243, 243)')
        colors.push(color);
    };
    return colors;
};

const getRating = (props) => {
    const rating = Math.round(props.rating);
    const colors = getRectangleColors(rating);
    return (
        colors.map((color, index) => {
            return (
                <Tooltip title={index + 1} key={index}>
                    <Box
                        sx={{
                            opacity: '0.8',
                            borderRadius: '2px',
                            marginLeft: '1px',
                            marginRight: '1px',
                            width: props.width * 0.08,
                            height: props.height,
                            backgroundColor: color,
                        }}
                    >
                    </Box>
                </Tooltip>
            )
        })
    )
}

const safelyIcon = (props) => {
    return (
        <Tooltip title='This ingredient is completely safe.'>
            <DoneIcon style={{ 
                color: ratingColorMap[1], 
                width:16, 
                height:16 }} />
        </Tooltip>
    )
};

const notDataIcon = (props) => {
    return (
        <Tooltip title='No hazard data available for the ingredient.'>
            <Box>
                <HelpOutlineIcon style={{ 
                    color: 'rgb(245, 0, 0)', 
                    width:16, 
                    height:16 }} />
            </Box>
        </Tooltip>
    )
};

const IngredientRatingBar = (props) => {
    // console.log('IngredientRatingBar props', props)
    return (
        <Box sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            borderRadius: '4px',
            border: '1px solid lightgray',
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '1px',
            paddingRight: '1px',
            height: props.height
        }}
        >
            {(props.rating > 0 && getRating(props))}
            {(props.rating == 0 && safelyIcon(props))}
            {(props.rating == null && notDataIcon(props))}
        </Box>
    )
};

export default IngredientRatingBar;
