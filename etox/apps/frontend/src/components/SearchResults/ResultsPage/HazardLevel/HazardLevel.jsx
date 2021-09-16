import React, { useState, useEffect } from "react";
import { getData } from '../../../Charts/ChartTools';
import Bar from '../../../Charts/Bar.jsx';
import './HazardLevel.css'

const HazardLevel = (props) => {
    console.log('HazardLevel props:', props);
    const [chartData, setChartData] = useState([{ 'value': null, 'id': null }]);
    useEffect(() => {
        const data = getData({
            dataset: props.searchResults.data.detail_hazard_product, 
            id:'hazard_class',
            value:'hazard_scale_score',
            label:'description',
        });
        setChartData(data)

    }, [props]);

    return (
        <div className='haz'>
            <Bar data={chartData} />
        </div>
    )
};

export default HazardLevel;
