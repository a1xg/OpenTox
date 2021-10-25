import React, { useState, useEffect } from "react";
import Bar from '../../../Charts/Bar.jsx';
import { getData } from '../../../Charts/ChartTools';
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


const margin = { top: 30, right: 30, bottom: 10, left: 30 };

const useStyles = makeStyles((theme) => ({
    chartWrapper: {
        height: '300px',
        paddingTop:'20px',
        paddingBottom:'20px',
        paddingRight:'50px',
        paddingLeft:'50px',
        position: "relative",
        [theme.breakpoints.down('md')]: {
            height: '170px',
            paddingTop:'10px',
            paddingBottom:'0px',
            paddingRight:'10px',
            paddingLeft:'10px',
        },
    }
}));

const PercentNotifications = (props) => {
    const [chartData, setChartData] = useState([{ value: null, id: null, label:null }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'percent_notifications',
            label: 'description',
        });
        setChartData(data);
    }, [props]);

    return (
        <Box className={classes.chartWrapper}>
            <Bar 
            data={chartData} 
            maxValue={100} 
            margin={margin} 
            caption='% of hazard notifications'
            />
        </Box>
    )

};

export default PercentNotifications;