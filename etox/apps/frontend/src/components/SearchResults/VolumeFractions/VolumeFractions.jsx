import React from 'react';
import DoughnutChart from '../../Charts/DoughnutChart.jsx';

const VolumeFractions = (props) => {
    return (
        <DoughnutChart
            title='Quantity of components with hazard class'
            labels={props.data.description}
            data={props.data.num_of_ingredients}
            borderColors={props.colors.borderColors}
            backgroundColors={props.colors.backgroundColors}
        />
    )
};

export default VolumeFractions;
