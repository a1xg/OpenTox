import React, { useState, useEffect } from "react";
import Bar from '../../../Charts/Bar.jsx';
import { getData } from '../../../Charts/ChartTools';
import { Box } from "@material-ui/core";
import { height } from "@mui/system";

const margin = { top: 50, right: 50, bottom: 50, left: 50 };

const PercentNotifications = (props) => {
    console.log('PercentNotifications props', props);
    const [chartData, setChartData] = useState([{ value: null, id: null, label:null }]);
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'percent_notifications',
            label: 'description',
        });
        setChartData(data);
        console.log('DATA:', data);
    }, [props]);

    return (
        <Box sx={{ width: '400px', height:'400px'}}>
            <Bar data={chartData} maxValue={100} margin={margin} />
        </Box>
    )

};

export default PercentNotifications;