import React, { useState, useEffect } from "react";
import Bar from '../../../Charts/Bar.jsx';
import { getData } from '../../../Charts/ChartTools';

const PercentNotifications = (props) => {
    console.log('PercentNotifications props', props);
    const [chartData, setChartData] = useState([{ value: null, id: null, label:null }]);
    useEffect(() => {
        const data = getData({
            dataset: props.searchResults.data.ingredient.hazard.hazard_ghs_set,
            key: 'hazard_class',
            value: 'percent_notifications',
            label: 'description',
        });
        setChartData(data);
        console.log('DATA:', data);
    }, [props]);

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Bar data={chartData} />
        </div>
    )

};

export default PercentNotifications;