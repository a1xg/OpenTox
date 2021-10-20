import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ratingColorMap } from './ChartsConfig';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chartWrapper: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        pointerEvents: "none",
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    title: {
        fontSize: '48px',
        [theme.breakpoints.down('md')]: {
            fontSize: '32px'
        },
    },
    subTitle: {
        fontSize: '16px',
        [theme.breakpoints.down('md')]: {
            fontSize: '12px'
        },
    },
}));

const TotalProductRating = (props) => {
    const classes = useStyles();

    return (
        props.total_rating > 0 &&
        <Box className={classes.chartWrapper} >
            <Typography
                variant='subtitle1'
                className={classes.subTitle}>
                Total rating
            </Typography>
            <Typography
                className={classes.title}
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