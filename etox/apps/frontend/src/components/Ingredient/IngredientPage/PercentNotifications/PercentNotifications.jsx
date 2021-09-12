import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import BarChart from '../../../Charts/BarChart.jsx';


const PercentNotifications = (props) => {
    console.log('PercentNotifications props', props);

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