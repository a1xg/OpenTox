import React from 'react';
import Doughnut from '../../../Charts/Doughnut.jsx';

const VolumeFractions = (props) => {
    return (
        <div style={{ width: '300px', height: '300px' }}>
            <Doughnut data={props.d}/>
        </div>
    )
};

export default VolumeFractions;
