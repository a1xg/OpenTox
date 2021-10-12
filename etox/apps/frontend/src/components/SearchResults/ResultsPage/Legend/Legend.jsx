import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import { Box, Typography } from "@material-ui/core";
import { Stack } from "@mui/material";


const useStyles = makeStyles((theme) => ({
    legengContainer:{
        alignItems:'center', 
        justifyContent:'space-around' 
    },
    legendItem:{
        alignItems:'center'
    },
    itemBox:{
        width:'90%', 
        border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius:4, 
        backgroundColor: theme.palette.grey[100],
        padding:10
    },

}));

const Legend = (props) => {
    console.log('Legend props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data)

    }, [props]);

    return (
        legendData.length > 0 &&
        <Stack direction='column' spacing={1} className={classes.legengContainer}>
            {legendData.map(item => {
                return (
                    <Box className={classes.itemBox} key={item.id}>
                    <Stack direction='column' key={item.id} className={classes.legendItem}>
                        <svg width='100%' height='4' >
                            <rect x="0" y="0" width="100%" height="4" rx="2" fill={item.color} />
                        </svg>
                        <Typography variant='caption'>{item.label}</Typography>
                    </Stack>
                    </Box>
                )
            })}
        </Stack>
    )
};

export default Legend;