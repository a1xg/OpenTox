import React, { useState, useEffect } from "react";
import Bar from '../../../Charts/Bar.jsx';
import { getData } from '../../../Charts/ChartTools';


const HazardLevel = (props) => {
    console.log('HazardLevel props', props);
    const [chartData, setChartData] = useState([{value: null, id: null, label:null}]);
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setChartData(data)
    }, [props])

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Bar data={chartData} maxValue={10} />
        </div>
    )
};

export default HazardLevel;