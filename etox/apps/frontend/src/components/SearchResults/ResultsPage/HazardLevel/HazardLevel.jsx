import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core';
import { getData } from '../../../Charts/ChartTools';
import Bar from '../../../Charts/Bar.jsx';

const HazardLevel = (props) => {
    console.log('HazardLevel props:', props);
    const [chartData, setChartData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
            notAvailableIgnore: true,
        });
        setChartData(data);
    }, [props]);

    return (
        <Box sx={{
            height: '400px',
            width: '400px',
            textAlign: 'center'
        }}
        >
            <Bar data={chartData} maxValue={10} />
        </Box>
    )
};

export default HazardLevel;
