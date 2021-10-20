import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Grid from '@mui/material/Grid';
import { Stack } from "@mui/material";
import { getData } from '../../../Charts/ChartTools';
import useStyles from "./styles.js";

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
        <Grid direction='row' container spacing={1} className={classes.grid}>
            {legendData.map(item => {
                return (
                    <Grid item xs={2} key={item.id}>
                        <Paper className={classes.gridItem} elevation={3} key={item.id}>
                            <Box className={classes.stackWrapper}>
                                <Stack direction='column' key={item.id} className={classes.legendItem}>
                                    <svg width='100%' height='4' >
                                        <rect x="0" y="0" width="100%" height="4" rx="2" fill={item.color} />
                                    </svg>
                                    <Typography variant='caption'>{item.label}</Typography>
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid >
    )
};

export default Legend;