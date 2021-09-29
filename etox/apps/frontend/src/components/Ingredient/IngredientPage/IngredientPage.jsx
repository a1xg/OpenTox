import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, makeStyles } from '@material-ui/core';
import IngredientRatingBar from '../../Charts/IngredientRatingBar.jsx';
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
                                    {
                                    //TODO не добавлять ссылку на страницу результатов, если с 
                                    //TODO сервера была запрошена страница ингредиента из браузерной строки
                                    props.searchResults.found == true &&
                                    <NavLink to='/search-results'>Back to search results</NavLink>
                                    }
                                    
                                    <ItemCard title='Name'>
                                        <Title data={props.searchResults.data} />
                                        <IngredientRatingBar
                                            rating={props.searchResults.data.ingredient.hazard.ingredient_hazard_avg}
                                            width={200}
                                            height={20}
                                        />
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
                                            <ItemCard
                                                title='Hazard level'
                                                caption='Hazard level for each hazard class for the ingredient'
                                            >
                                                <HazardLevel
                                                    searchResults={props.searchResults}
                                                />
                                            </ItemCard>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ItemCard
                                                title='Data confidence (%)'
                                                caption='Confidence based on the number of notifications in the system of GHS'
                                            >
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
                            <ItemCard title='Description'>
                                <Description data={props.searchResults.data} />
                            </ItemCard>
                        </Grid>
                    </Grid>
                    <Grid item xs container direction="row" spacing={5}>
                        <Grid item xs={12}>
                            <ItemCard title='Synonyms'>
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