import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core';
import { getData } from '../../../Charts/ChartTools';
import Doughnut from '../../../Charts/Doughnut.jsx';
import TotalProductRating from '../../../Charts/TotalProductRating.jsx';


const margin = { top: 50, right: 50, bottom: 50, left: 50 };

const VolumeFractions = (props) => {
    console.log('VolumeFractions props', props);
    const [chartData, setChartData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    useEffect(() => {
        const data = getData({
            dataset: props.data.detail_hazard_product,
            key: 'hazard_class',
            value: 'num_of_ingredients',
            label: 'description'
        });
        setChartData(data)

    }, [props])

    return (
        <Box sx={{ 
            position: "relative",
            width: '400px',
            height: '400px',
        }}
        >
           <Doughnut 
           data={chartData} 
           margin={margin} 
           caption=' ingredients' />
           <TotalProductRating 
           total_rating={props.data.product_hazard_avg} 
           margin={margin} />
            {/**/}
            {/**/}
        </Box>
        
    )
};

export default VolumeFractions;
