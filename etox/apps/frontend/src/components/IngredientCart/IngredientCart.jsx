import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { EmptyIngredient } from '../EmptyResults';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from '@material-ui/core';
import { getColors, dictsToArrays } from '../Charts/ChartTools';

import Details from "./Details/Details.jsx";
import Description from "./Description/Description.jsx";
import HazardLevel from "./HazardLevel/HazardLevel.jsx";
import Header from "./Header/Header.jsx";
import Legend from "./Legend/Legend.jsx";
import PercentNotifications from "./PercentNotifications/PercentNotifications.jsx";
import Synonyms from "./Synonyms/Synonyms.jsx";

import BarChart from '../Charts/BarChart.jsx';
import HazardBar from '../Charts/HazardBar.jsx';


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
    }
}));

const IngredientCart = (props) => {
    console.log('Ingredient cart props', props)
    const classes = useStyles();
    const url = '/api' + props.location.pathname;
    const [searchResults, setSearchResults] = useState({
        data: EmptyIngredient,
        found: false
    });
    // !FIXME данных в hazard.hazard_ghs_set может и не быть и надо это предусмотреть, желательно сделать централизованную валидацию 

    const data = dictsToArrays(searchResults.data.ingredient.hazard.hazard_ghs_set);
    const colors = getColors({
        numberOfColors: searchResults.data.ingredient.hazard.hazard_ghs_set.length,
        backgroundClarity: '0.4',
        borderClarity: '1'
    });

    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(response => { return response.json(); })
            .then((data) => {
                setSearchResults({
                    data: data,
                    found: true
                });
            });
    }, []);

    return (
        <div className={classes.root}>
            <NavLink to='/search-results'>Back to search results</NavLink>
            <Grid item xs container direction="column" spacing={2}>
                # row1
                <Grid item xs={12}>
                    <Grid item xs container direction="row" spacing={2}>
                        <Grid item xs={4}>
                            <Paper className={classes.tape}>
                                <Header data={searchResults.data} />
                            </Paper>
                        </Grid>
                    </Grid>
                    # row2
                    <Grid item xs container direction="row" spacing={1}>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>
                                <Details data={searchResults.data} />
                            </Paper>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid item xs container direction="column" spacing={1}>
                                <Grid item xs={12}>
                                    <Grid item xs container direction="row" spacing={1}>
                                        <Grid item xs={6}>
                                            <Paper className={classes.paper}>
                                                <HazardLevel data={data} colors={colors} />
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Paper className={classes.paper}>
                                                <PercentNotifications data={data} colors={colors} />
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                    <Legend 
                                    data={data} 
                                    colors={colors} 
                                    source={searchResults.data.ingredient.hazard.cl_inventory_id}
                                    total_notifications={searchResults.data.ingredient.hazard.total_notifications} />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    # row3
                    <Grid item xs container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Description data={searchResults.data} />
                            </Paper>
                        </Grid>
                    </Grid>
                    row4
                    <Grid item xs container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Synonyms data={searchResults.data} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )

};

export default IngredientCart;