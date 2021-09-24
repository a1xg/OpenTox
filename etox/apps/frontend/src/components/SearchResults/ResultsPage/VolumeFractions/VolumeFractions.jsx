import React, { useState, useEffect } from "react";
import { getData } from '../../../Charts/ChartTools';
import Doughnut from '../../../Charts/Doughnut.jsx';
import ItemCard from "../../../ItemCard/ItemCard.jsx";

import './VolumeFractions.css';

const VolumeFractions = (props) => {
    console.log('VolumeFractions props', props);
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
            <Doughnut data={chartData} total_rating={props.searchResults.data.product_hazard_avg} />
    )
};

export default VolumeFractions;
