import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { colorMap } from '../../../../Charts/ChartsConfig';


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

const getColors = (data) => {
    const colors = [];
    data.map(item => {
        colors.push(colorMap[item.hazard_class])
    });
    return colors;
};

const BriefStatistics = (props) => {
    console.log('BriefStatistics props', props);
    const [colors, setColors] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const col = getColors(props.data);
        setColors(col);
    },[props])

    return (
        <Container>
            <Grid item xs container direction="row" spacing={3} className={classes.root}>
                {colors.map(color => {
                    return (
                        <Grid item xs={2} key={color}>
                            <svg width='14' height='14' >
                                <circle cx="7" cy="7" r="7" fill={color} />
                            </svg>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
};

export default BriefStatistics;