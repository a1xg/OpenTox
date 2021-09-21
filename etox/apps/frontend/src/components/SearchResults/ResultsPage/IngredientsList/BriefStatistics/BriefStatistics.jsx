import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { colorMap } from '../../../../Charts/ChartsConfig';


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

const getColors = (data) => {
    const colors = [];
    data.map(item => {
        colors.push(colorMap[item.hazard_class])
    });
    return colors;
};

//TODO сделать всплывающую подсказку при наведении на один из 'кружков'.
const BriefStatistics = (props) => {
    console.log('BriefStatistics props', props);
    const [colors, setColors] = useState(['white']);
    const classes = useStyles();

    useEffect(() => {
        const col = getColors(props.data);
        setColors(col);
    }, [props])

    return (
        <Grid item xs container direction="row" spacing={1} className={classes.root}>
            {colors.map(color => {
                return (
                    <Grid item xs={0} key={color} xs={2}>
                        <svg width='14' height='14' >
                            <circle cx="7" cy="7" r="7" fill={color} />
                        </svg>
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default BriefStatistics;