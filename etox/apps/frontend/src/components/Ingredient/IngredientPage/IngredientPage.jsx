import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Details from "./Details/Details.jsx";
import Description from "./Description/Description.jsx";
import HazardLevel from "./HazardLevel/HazardLevel.jsx";
import Title from "./Title/Title.jsx";
import Legend from "./Legend/Legend.jsx";
import PercentNotifications from "./PercentNotifications/PercentNotifications.jsx";
import Synonyms from "./Synonyms/Synonyms.jsx";


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

const IngredientPage = (props) => {
    console.log('IngredientPage props', props)
    const classes = useStyles();
    // !TODO вынести Paper в вызываемые компоненты, а компоненты в свою очередь оборачивать в единый для всех ItemCart
    return (
        <div className={classes.root}>
        <NavLink to='/search-results'>Back to search results</NavLink>
        <Grid item xs container direction="column" spacing={2}>
            # row1
            <Grid item xs={12}>
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={4}>    
                        <Title data={props.searchResults.data} />
                    </Grid>
                </Grid>
                # row2
                <Grid item xs container direction="row" spacing={1}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <Details data={props.searchResults.data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid item xs container direction="column" spacing={1}>
                            <Grid item xs={12}>
                                <Grid item xs container direction="row" spacing={1}>
                                    <Grid item xs={6}>
                                        <Paper className={classes.paper}>
                                            <HazardLevel 
                                            data={props.chartData.datasets} 
                                            colors={props.chartData.colors} 
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Paper className={classes.paper}>
                                            <PercentNotifications 
                                            data={props.chartData.datasets} 
                                            colors={props.chartData.colors} 
                                            />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                <Legend 
                                data={props.chartData.datasets} 
                                colors={props.chartData.colors} 
                                source={props.searchResults.data.ingredient.hazard.cl_inventory_id}
                                total_notifications={props.searchResults.data.ingredient.hazard.total_notifications} />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                # row3
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Description data={props.searchResults.data} />
                        </Paper>
                    </Grid>
                </Grid>
                row4
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Synonyms data={props.searchResults.data} />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
    )
};

export default IngredientPage;