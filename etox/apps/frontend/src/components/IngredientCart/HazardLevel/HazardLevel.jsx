import React from 'react';
import BarChart from '../../Charts/BarChart.jsx';
import GridItem from '../../GridItem/GridItem.jsx';


const HazardLevel = (props) => {
    console.log('HazardLevel props', props)
    /*
    const getData = () => {
        if (props.data.ingredient.hazard.hazard_ghs_set.length > 0) {
            return props.data.ingredient.hazard
        } else {
            return (<p>Not data</p>)
        }
    }
    */

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