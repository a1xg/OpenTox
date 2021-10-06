import React from 'react';
import { Box, Tooltip, makeStyles } from '@material-ui/core';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ratingColorMap } from './ChartsConfig';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        borderRadius: '4px',
        border: `1px solid ${theme.palette.grey[300]}`,
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingLeft: '1px',
        paddingRight: '1px',
        height: theme.height
    },
    redIcon:{
        color: theme.palette.warning.light
    },
    greenIcon:{
        color:theme.palette.primary.main
    }
}))

const getRectangleColors = (rating) => {
    let colors = [];
    for (let i = 1; i <= 10; i++) {
        let color = (i <= rating ? ratingColorMap[i] : 'rgb(245, 243, 243)')
        colors.push(color);
    };
    return colors;
};

const IngredientRatingBar = (props) => {
    const classes = useStyles(props);
    const rating = props.rating != null ? Math.round(props.rating) : null;
    const colors = rating != null ? getRectangleColors(rating) : null;

    return (
        <Box className={classes.root}>
            {props.rating > 0 &&
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
            }
            {props.rating == 0 &&
                <Tooltip title='This ingredient is completely safe.'>
                        <ThumbUpIcon className={classes.greenIcon} />
                </Tooltip>
            }
            {props.rating == null &&
                <Tooltip title='No hazard data available for the ingredient.'>
                    <HelpOutlineIcon className={classes.redIcon} />
                </Tooltip>
            }
        </Box>
    )
};

export default IngredientRatingBar;
