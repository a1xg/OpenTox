import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import Bar from '../../../Charts/Bar.jsx';

const margin = { 
    top: 30, 
    right: 30, 
    bottom: 30, 
    left: 30 
};

const useStyles = makeStyles((theme) => ({
    chartWrapper:{
        height:'300px',
        [theme.breakpoints.down('md')]: {
            height: '200px'
          },
    }   
}));

const HazardLevel = (props) => {
    const [chartData, setChartData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
            notAvailableIgnore: true,
        });
        setChartData(data);
    }, [props]);

    return (
        <Box className={classes.chartWrapper}>  
            <Bar 
            data={chartData} 
            maxValue={10} 
            margin={margin} 
            caption='/10' 
            />
        </Box>
    )
};

export default HazardLevel;
