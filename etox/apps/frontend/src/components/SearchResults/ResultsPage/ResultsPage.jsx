import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from '@material-ui/core';
import IngredientsList from './IngredientsList/IngredientsList.jsx';
import HazardLevel from './HazardLevel/HazardLevel.jsx';
import Legend from './Legend/Legend.jsx';
import ProductPhoto from './ProductPhoto/ProductPhoto.jsx';
import VolumeFractions from './VolumeFractions/VolumeFractions.jsx';
import ProductRatingBar from './ProductRatingBar/ProductRatingBar.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    tape: {
        padding: theme.spacing(0.2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
}));

const ResultsPage = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs={12}>
                    <Grid item xs container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.tape} elevation={3}>
                                <ProductRatingBar
                                    rating={props.searchResults.data.product_hazard_avg}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="row" spacing={2}>
                        <Grid item xs={4}>
                            <Paper className={classes.paper} elevation={3}>
                                <VolumeFractions
                                    data={props.chartData.datasets}
                                    colors={props.chartData.colors}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper} elevation={3}>
                                <HazardLevel
                                    data={props.chartData.datasets}
                                    colors={props.chartData.colors}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper} elevation={3}>
                                <Legend
                                    data={props.chartData.datasets}
                                    colors={props.chartData.colors}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="row" spacing={2}>
                        <Grid item xs={8}>
                            <Paper className={classes.paper} elevation={3}>
                                <IngredientsList
                                    data={props.searchResults.data}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper} elevation={3}>
                                <ProductPhoto />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

export default ResultsPage;