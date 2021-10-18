import React, { useState, useEffect } from "react";
import Bar from '../../../Charts/Bar.jsx';
import { getData } from '../../../Charts/ChartTools';
import Box from "@material-ui/core/Box";

const margin = { top: 30, right: 30, bottom: 10, left: 30 };

const PercentNotifications = (props) => {
    const [chartData, setChartData] = useState([{ value: null, id: null, label:null }]);
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'percent_notifications',
            label: 'description',
        });
        setChartData(data);
    }, [props]);

    return (
        <Box sx={{  height:'300px'}}>
            <Bar 
            data={chartData} 
            maxValue={100} 
            margin={margin} 
            caption='% of hazard notifications'
            />
        </Box>
    )

};

export default PercentNotifications;