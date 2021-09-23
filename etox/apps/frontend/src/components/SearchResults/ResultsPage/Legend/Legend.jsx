import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import { Grid, Box, Typography } from "@material-ui/core";
import { List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
    },
    rowItem: {
        padding: theme.spacing(1),
    },
    text: {
        textAlign: 'left'
    },
    svg: {
        alignContent: 'center'    },
    wrapper:  {
        padding: theme.spacing(1),
        alignContent: 'center'
    }
}));

//TODO отрефакторить код: переписать на компонентах Material UI
const Legend = (props) => {
    console.log('Legend props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data.detail_hazard_product,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data)

    }, [props]);

    return (
        <Box className={classes.wrapper}>
            <Grid container direction="column" className={classes.root}>
                <Grid item xs={12} >
                {legendData.map(item => {
                    return (
                        <Grid item xs={12} key={item.id}>
                            <Grid item xs container direction="row" className={classes.rowItem}>
                                <Grid item xs={2} className={classes.svg} >
                                    <svg width='40' height='20' >
                                        <rect x="0" y="0" width="40" height="20" fill={item.color} />
                                    </svg>
                                </Grid>
                                <Grid item xs={10} className={classes.text}>
                                    <Typography variant='body1'>{item.label}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
                </Grid>
            </Grid>
        </Box>
    )
};

export default Legend;