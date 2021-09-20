import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import { Grid, Container, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
    },
    rowItem: {

    },
    text: {
        textAlign: 'left'
    },
    svg: {
        alignContent: 'center'
    },
    wrapper:  {
        padding: theme.spacing(0)
    }
}));


const Legend = (props) => {
    console.log('Legend props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data.detail_hazard_product,
            id: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data)

    }, [props]);

    return (
        <Container className={classes.wrapper}>
            <Grid item xs container direction="column" spacing={0} className={classes.root}>
                {legendData.map(item => {
                    return (
                        <Grid item xs={12} key={item.id}>
                            <Grid item xs container direction="row" spacing={0} className={classes.rowItem}>
                                <Grid item xs={2} className={classes.svg} >
                                    <svg width='40' height='20' >
                                        <rect x="0" y="0" width="40" height="20" fill={item.color} />
                                    </svg>
                                </Grid>
                                <Grid item xs={10} className={classes.text}>
                                    <Typography variant='h6'>{item.label}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
};

export default Legend;