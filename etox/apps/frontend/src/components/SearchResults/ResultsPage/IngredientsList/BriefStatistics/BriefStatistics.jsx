import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Tooltip } from "@material-ui/core";
import { chartColorMap } from '../../../../Charts/ChartsConfig';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0.5),
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
    //console.log('BriefStatistics props', props);
    const [data, setData] = useState([{ color: 'white', description: '', hazard_class: '', id: null }]);
    const classes = useStyles();

    useEffect(() => {
        props.data.map(item => { 
            item.color = chartColorMap[item.hazard_class]
        });
        setData(props.data);
    }, [props]);

    return (
        <Grid item xs container direction="row" spacing={1} className={classes.root}>
            {data.map(item => {
                return (
                    <Grid item xs={0} key={item.color} xs={2}>
                        <Tooltip title={item.description}>
                            <svg width='14' height='14' >
                                <circle cx="7" cy="7" r="7" fill={item.color} />
                            </svg>
                        </Tooltip>
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default BriefStatistics;