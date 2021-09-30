import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core';
import { getData } from '../../../Charts/ChartTools';
import Doughnut from '../../../Charts/Doughnut.jsx';
import TotalProductRating from '../../../Charts/TotalProductRating.jsx';


const margin = { top: 40, right: 40, bottom: 40, left: 40 };

const VolumeFractions = (props) => {
    console.log('VolumeFractions props', props);
    const [chartData, setChartData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    useEffect(() => {
        const data = getData({
            dataset: props.data.detail_hazard_product,
            key: 'hazard_class',
            value: 'num_of_ingredients',
            label: 'description'
        });
        setChartData(data)

    }, [props])

    return (
        <Box sx={{
            fontFamily: "consolas, sans-serif",
            textAlign: "center",
            position: "relative",
            width: 400,
            height: 400
        }}
        >
            <Doughnut data={chartData} margin={margin} />
            <Box sx={{
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
            }}
            >
                <TotalProductRating total_rating={props.data.product_hazard_avg} />
            </Box>
        </Box>
    )
};

export default VolumeFractions;
