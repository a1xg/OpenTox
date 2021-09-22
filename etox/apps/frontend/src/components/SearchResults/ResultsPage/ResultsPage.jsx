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
    diagram: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        height:'100%', 
        width:'100%'
    },
    IngredientsList: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
    },
    tape: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
}));

const ResultsPage = (props) => {
    console.log('ResultsPage props', props)
    const classes = useStyles();
    // !TODO вынести Paper в вызываемые компоненты, а компоненты в свою очередь оборачивать в единый для всех ItemCart

    return (
        <Grid container direction="column" spacing={2} className={classes.root}>
            <Grid item xs={12} >
                {/*
                <Grid item xs container direction="row" spacing={2} alignItems="stretch">
                    <Grid item xs={12} >
                        <Paper className={classes.tape} elevation={3} >
                            <ProductRatingBar rating={props.searchResults.data.product_hazard_avg} />
                        </Paper>
                    </Grid>
                </Grid>
                */}
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={4} >
                        <Paper className={classes.diagram} elevation={3}>
                            <VolumeFractions searchResults={props.searchResults} />
                        </Paper>
                    </Grid>
                    <Grid item xs={4} >
                        <Paper className={classes.diagram} elevation={3}>
                            <HazardLevel searchResults={props.searchResults}  />
                        </Paper>
                    </Grid>
                    <Grid item xs={4} >
                        <Paper className={classes.diagram} elevation={3}>
                            <Legend data={props.searchResults.data} />
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={8} >
                        <Paper className={classes.IngredientsList} elevation={3}>
                            <IngredientsList data={props.searchResults.data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={4} >
                        <Paper className={classes.IngredientsList} elevation={3}>
                            <ProductPhoto />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default ResultsPage;