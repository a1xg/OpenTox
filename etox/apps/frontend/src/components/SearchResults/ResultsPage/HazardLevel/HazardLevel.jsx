import React from 'react';
import DoughnutChart from '../../../Charts/DoughnutChart.jsx';
import BarChart from '../../../Charts/BarChart.jsx';
import HazardBar from '../../../Charts/HazardBar.jsx';
import style from './HazardLevel.module.css';
import { getColors, dictsToArrays } from '../../../Charts/ChartTools'


const ProductHazardStatistics = (props) => {
    console.log('ProductHazardStatistics props:', props);

    return (
        <BarChart
            labels={props.data.description}
            data={props.data.hazard_scale_score}
            borderColors={props.colors.borderColors}
            backgroundColors={props.colors.backgroundColors}
            title={'Hazard level for each class'}
        />
    )
};

export default ProductHazardStatistics;
