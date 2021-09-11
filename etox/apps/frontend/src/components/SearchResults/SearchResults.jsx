import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from '@material-ui/core';
import { TextField, InputAdornment, Card, CardContent, CardActions, Typography, CardMedia } from "@material-ui/core";
import { getColors, dictsToArrays } from '../Charts/ChartTools';

import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';

import IngredientsList from './IngredientsList/IngredientsList.jsx';
import HazardLevel from './HazardLevel/HazardLevel.jsx';
import Legend from './Legend/Legend.jsx';
import ProductPhoto from './ProductPhoto/ProductPhoto.jsx';
import VolumeFractions from './VolumeFractions/VolumeFractions.jsx';
import ProductRatingBar from './ProductRatingBar/ProductRatingBar.jsx';


import style from './SearchResults.module.css';

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

const SearchResults = (props) => {
    console.log('SearchResults props:', props);
    const classes = useStyles();
    let data = {};
    let colors = {};

    if (props.searchResults.loaded == true) {
        data = dictsToArrays(props.searchResults.data.detail_hazard_product);
        colors = getColors({
            numberOfColors: props.searchResults.data.detail_hazard_product.length,
            backgroundClarity: '0.4',
            borderClarity: '1'
        });

        return (
            <div className={classes.root}>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Grid item xs container direction="row" spacing={2}>
                            <Grid item xs={12}>
                                <Paper className={classes.tape} elevation={3}>
                                    <ProductRatingBar rating={props.searchResults.data.product_hazard_avg} />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="row" spacing={2}>
                            <Grid item xs={4}>
                                <Paper className={classes.paper} elevation={3}>
                                    <VolumeFractions data={data} colors={colors} />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper} elevation={3}>
                                    <HazardLevel data={data} colors={colors} />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper} elevation={3}>
                                    <Legend />
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="row" spacing={2}>
                            <Grid item xs={8}>
                                <Paper className={classes.paper} elevation={3}>
                                    <IngredientsList data={props.searchResults.data} />
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
    } else if (props.searchResults.loaded == false) {
        return (<div></div>)
    } else { return (<ErrorMessage />) }
};

export default SearchResults;