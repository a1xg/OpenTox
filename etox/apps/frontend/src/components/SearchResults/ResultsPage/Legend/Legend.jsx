import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Grid from '@mui/material/Grid';
import { Stack } from "@mui/material";
import { getData } from '../../../Charts/ChartTools';
import useStyles from "./styles.js";
//TODO вернуть вертикальную легенду
const Legend = (props) => {
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
                    <Paper className={classes.itemBox} elevation={3} key={item.id}>
                    <Stack direction='column' key={item.id} className={classes.legendItem}>
                        <svg width='100%' height='4' >
                            <rect x="0" y="0" width="100%" height="4" rx="2" fill={item.color} />
                        </svg>
                        <Typography variant='caption'>{item.label}</Typography>
                    </Stack>
                    </Paper>
                )
            })}
        </Stack>
    )
};

export default Legend;