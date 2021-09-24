import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Paper, makeStyles } from '@material-ui/core';
import Details from "./Details/Details.jsx";
import Description from "./Description/Description.jsx";
import HazardLevel from "./HazardLevel/HazardLevel.jsx";
import Title from "./Title/Title.jsx";
import Legend from "./Legend/Legend.jsx";
import PercentNotifications from "./PercentNotifications/PercentNotifications.jsx";
import Synonyms from "./Synonyms/Synonyms.jsx";
import ItemCard from "../../ItemCard/ItemCard.jsx";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        height: '100%',
        width: '100%'
    },
    tape: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    details: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        height: '100%',
        width: '100%'
    }
}));

const IngredientPage = (props) => {
    console.log('IngredientPage props', props)
    const classes = useStyles();
    return (
        <div>
            <Grid item xs container direction="column" spacing={0} className={classes.root}>
                <Grid item xs={12}>
                    <Grid item xs container direction="row" spacing={2}>
                        <Grid item xs={3}>
                            <Grid item xs container direction="column" spacing={2} >
                                <Grid item xs={12}>
                                    <NavLink to='/search-results'>Back to search results</NavLink>
                                    <ItemCard title='Name'>
                                        <Title data={props.searchResults.data} />
                                    </ItemCard>
                                </Grid>
                                <Grid item xs={12} >
                                    <ItemCard title='Details'>
                                        <Details data={props.searchResults.data} />
                                    </ItemCard>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <Grid item xs container direction="row" spacing={2}>
                                        <Grid item xs={6}>
                                            <ItemCard title='Hazard level'>
                                                <HazardLevel
                                                    searchResults={props.searchResults}
                                                />
                                            </ItemCard>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ItemCard title='Percent of notifications'>
                                                <PercentNotifications searchResults={props.searchResults} />
                                            </ItemCard>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <ItemCard title='Chart legend'>
                                        <Legend data={props.searchResults.data} />
                                    </ItemCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="row" spacing={5}>
                        <Grid item xs={12}>
                            <ItemCard title='Ingredient description'>
                                <Description data={props.searchResults.data} />
                            </ItemCard>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="row" spacing={5}>
                        <Grid item xs={12}>
                            <ItemCard title='Ingredient synonyms'>
                                <Synonyms data={props.searchResults.data} />
                            </ItemCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    )
};

export default IngredientPage;