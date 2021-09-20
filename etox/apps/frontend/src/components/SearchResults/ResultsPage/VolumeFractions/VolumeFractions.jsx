import React, { useState, useEffect } from "react";
import { getData } from '../../../Charts/ChartTools';
import Doughnut from '../../../Charts/Doughnut.jsx';
import './VolumeFractions.css';

const VolumeFractions = (props) => {
    console.log('VolumeFractions props', props);
    const [chartData, setChartData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    useEffect(() => {
        const data = getData({
            dataset: props.searchResults.data.detail_hazard_product,
            label: 'description',
            id: 'hazard_class',
            value: 'num_of_ingredients'
        });
        setChartData(data)

    }, [props])


    return (
        <div className='vol'>
            <Doughnut data={chartData} />
        </div>
    )
};

export default VolumeFractions;
