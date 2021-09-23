import React, { useState, useEffect } from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
import { Grid, Typography, Box, Divider } from '@material-ui/core';
import { getData } from '../../../Charts/ChartTools';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(1),
    },
    rowItem: {

    }
}));

const Legend = (props) => {
    console.log('Legend props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();

    useEffect(() => {
        const data = getData({
            dataset: props.data.ingredient.hazard.hazard_ghs_set,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data);
    }, [props]);

    return (
        <Box className={classes.wrapper}>
            <Grid container direction="column" spacing={1} >
                <Grid item xs container direction='row' className={classes.rowItem}>
                    {legendData.map(item => {
                        return (
                            <Grid item xs container direction='row' key={item.id}>
                                <Grid item xs={2}>
                                    <svg width='40' height='20' >
                                        <rect x="0" y="0" width="40" height="20" fill={item.color} />
                                    </svg>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant='body1'>{item.label}</Typography>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12}  className={classes.rowItem}>
                    <Divider></Divider>
                        <Typography variant='subtitle2'>
                            Total notifications: {props.data.ingredient.hazard.total_notifications} 
                        </Typography>
                        <Typography variant='subtitle2'>Sourse: <a
                            href={"https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/" + props.data.ingredient.hazard.cl_inventory_id}>European
                            Chemicals Agency (ECHA)</a>
                        </Typography>
                    
                </Grid>
            </Grid>
        </Box>
    )
};

export default Legend;