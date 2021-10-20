import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import Bar from '../../../Charts/Bar.jsx';

const margin = { 
    top: 5, 
    right: 20, 
    bottom: 5, 
    left:20 
};

const useStyles = makeStyles((theme) => ({
    chartWrapper:{
        height:'300px',
        paddingTop:'20px',
        paddingBottom:'20px',
        paddingLeft:'40px',
        paddingRight:'40px',
        [theme.breakpoints.down('md')]: {
            height: '170px',
            paddingTop:'10px',
            paddingBottom:'10px',
            paddingLeft:'10px',
            paddingRight:'10px',
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
