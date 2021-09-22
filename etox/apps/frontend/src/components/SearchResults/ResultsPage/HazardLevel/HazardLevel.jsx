import React, { useState, useEffect } from "react";
import { getData } from '../../../Charts/ChartTools';
import Bar from '../../../Charts/Bar.jsx';
import './HazardLevel.css'

const HazardLevel = (props) => {
    console.log('HazardLevel props:', props);
    const [chartData, setChartData] = useState([{ value: null, id: null, label:null, color:'white' }]);
    useEffect(() => {
        const data = getData({
            dataset: props.searchResults.data.detail_hazard_product, 
            key:'hazard_class',
            value:'hazard_scale_score',
            label:'description',
            notAvailableIgnore: true,
        });
        console.log('HazardLevel Final data:', data);
        setChartData(data);

    }, [props]);

    return (
        <div className='haz'>
            <Bar data={chartData} />
        </div>
    )
};

export default HazardLevel;
