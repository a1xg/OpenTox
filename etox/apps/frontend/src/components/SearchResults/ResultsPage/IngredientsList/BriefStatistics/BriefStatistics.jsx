import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../../Charts/ChartTools';
import { Grid, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    rowItem: {

    },
    text: {
        textAlign: 'center'
    },
    figure: {
        alignContent: 'center'
    }
}));

const BriefStatistics = (props) => {
    console.log('BriefStatistics props', props);
    const [statisticsData, setStatisticsData] = useState([{ value: null, id: null, label:null, color:'white' }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data.detail_hazard_product, 
            id:'hazard_class',
            value:'hazard_scale_score',
            label:'description',
        });
        setLegendData(data)

    }, [props]);

    return (
        <Container>
            <Grid item xs container direction="column" spacing={2} className={classes.root}>
                {legendData.map(item => {
                    return (
                        <Grid item xs={12} key={item.id}>
                            <Grid item xs container direction="row" spacing={2} className={classes.rowItem}>
                                <Grid item xs={4} className={classes.figure} >
                                    <svg width='40' height='20' >
                                        <rect x="0" y="0" width="40" height="20" fill={item.color} />
                                    </svg>
                                </Grid>
                                <Grid item xs={8} className={classes.text}>
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

export default BriefStatistics;