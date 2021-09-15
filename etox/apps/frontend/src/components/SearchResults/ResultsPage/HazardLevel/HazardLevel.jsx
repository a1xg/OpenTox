import React from 'react';
import Bar from '../../../Charts/Bar.jsx';

const ProductHazardStatistics = (props) => {
    console.log('ProductHazardStatistics props:', props);

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Bar c={props.c} />
        </div>
    )
};

export default ProductHazardStatistics;
