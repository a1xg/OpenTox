import React from 'react';
import GridItem from '../../GridItem/GridItem.jsx';
import BarChart from '../../Charts/BarChart.jsx';


const PercentNotifications = (props) => {
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
                data={props.data.percent_notifications}
                borderColors={props.colors.borderColors}
                backgroundColors={props.colors.backgroundColors}
                title={'Percent notifications from company'}
            />
        </div>
    )

};

export default PercentNotifications;