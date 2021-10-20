import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import { getData } from '../../../Charts/ChartTools';
import Doughnut from '../../../Charts/Doughnut.jsx';
import TotalProductRating from '../../../Charts/TotalProductRating.jsx';
import { makeStyles } from "@material-ui/core/styles";

const margin = {
    top: 20, 
    right: 20, 
    bottom: 20, 
    left: 20 
    };

const useStyles = makeStyles((theme) => ({
    chartWrapper:{
        height:'300px',
        position: "relative",
        [theme.breakpoints.down('md')]: {
            height: '200px'
          },
    }
}))


const ProductStatistics = (props) => {
    const [chartData, setChartData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();

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
        <Box className={classes.chartWrapper}>
           <Doughnut 
           data={chartData} 
           margin={margin} 
           caption=' ingredients' />
           <TotalProductRating 
           total_rating={props.data.product_hazard_avg} 
           margin={margin} />
        </Box>        
    )
};

export default ProductStatistics;
