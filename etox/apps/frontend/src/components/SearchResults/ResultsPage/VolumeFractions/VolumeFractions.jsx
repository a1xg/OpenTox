import React, { useState, useEffect } from "react";
import { getData } from '../../../Charts/ChartTools';
import Doughnut from '../../../Charts/Doughnut.jsx';
import TotalProductRating from '../../../Charts/TotalProductRating.jsx';
import { Container, Box, makeStyles } from '@material-ui/core';
import './VolumeFractions.css';

const margin = { top: 40, right: 40, bottom: 40, left: 40 };

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "consolas, sans-serif",
        textAlign: "center",
        position: "relative",
        width: 400,
        height: 400
    },
    overlay: {
        position: "absolute",
        top: 0,
        right: margin.right,
        bottom: 0,
        left: margin.left,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 48,
        textAlign: "center",
        pointerEvents: "none"
    }
}));

const VolumeFractions = (props) => {
    console.log('VolumeFractions props', props);
    const classes = useStyles();
    const [chartData, setChartData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    useEffect(() => {
        const data = getData({
            dataset: props.searchResults.data.detail_hazard_product,
            key: 'hazard_class',
            value: 'num_of_ingredients',
            label: 'description'
        });
        setChartData(data)

    }, [props])

    return (
        <Container className={classes.root}>
            <Doughnut data={chartData} margin={margin} />
            <Box className={classes.overlay}>
                <TotalProductRating total_rating={props.searchResults.data.product_hazard_avg} />
            </Box>
        </Container>
    )
};

export default VolumeFractions;
