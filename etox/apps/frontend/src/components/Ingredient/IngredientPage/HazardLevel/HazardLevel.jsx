import React from 'react';
import BarChart from '../../../Charts/BarChart.jsx';
import GridItem from '../../../GridItem/GridItem.jsx';


const HazardLevel = (props) => {
    console.log('HazardLevel props', props)

    return (
        <div>
            <BarChart
                labels={props.data.description}
                data={props.data.hazard_scale_score}
                borderColors={props.colors.borderColors}
                backgroundColors={props.colors.backgroundColors}
                title={'Hazard level for each class'}
            />
        </div>
    )
};

export default HazardLevel;