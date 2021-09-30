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

// TODO поработать над Box элементами в которые оборачиваются все компоненты
//TODO не добавлять ссылку на страницу результатов, если с 
//TODO сервера была запрошена страница ингредиента из браузерной строки
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
                                    <NavLink to='/search-results'>Back to search results</NavLink>
                                    <ItemCard title='Name'>
                                        <Title mainName={props.searchResults.data.ingredient.main_name} />
                                        <IngredientRatingBar
                                            rating={props.searchResults.data.ingredient.hazard.ingredient_hazard_avg}
                                            width={200}
                                            height={20}
                                        />
                                    </ItemCard>
                                </Grid>
                                <Grid item xs={12} >
                                    <ItemCard title='Details'>
                                        <Details data={props.searchResults.data.ingredient} />
                                    </ItemCard>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <Grid item xs container direction="row" spacing={2}>
                                        {props.searchResults.data.ingredient.hazard.hazard_ghs_set.length > 0 &&
                                            <Grid item xs={6}>
                                                <ItemCard
                                                    title='Hazard level'
                                                    caption='Hazard level for each hazard class for the ingredient'
                                                >
                                                    <HazardLevel
                                                        data={props.searchResults.data.ingredient.hazard.hazard_ghs_set}
                                                    />
                                                </ItemCard>
                                            </Grid>
                                        }
                                        {props.searchResults.data.ingredient.hazard.hazard_ghs_set.length > 0 &&
                                            <Grid item xs={6}>
                                                <ItemCard
                                                    title='Data confidence (%)'
                                                    caption='Confidence based on the number of notifications in the system of GHS'
                                                >
                                                    <PercentNotifications
                                                        data={props.searchResults.data.ingredient.hazard.hazard_ghs_set}
                                                    />
                                                </ItemCard>
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <ItemCard title='Chart legend'>
                                        <Legend data={props.searchResults.data.ingredient.hazard} />
                                    </ItemCard>
                                </Grid>
                                {props.searchResults.data.ingredient.description != null &&
                                    <Grid item xs={12}>
                                        <ItemCard title='Description'>
                                            <Description data={props.searchResults.data.ingredient.description} />
                                        </ItemCard>
                                    </Grid>
                                }
                                {props.searchResults.data.ingredient.synonyms != null &&
                                    props.searchResults.data.ingredient.synonyms.eng != null &&
                                    <Grid item xs={12}>
                                        <ItemCard title='Synonyms'>
                                            <Synonyms
                                                data={props.searchResults.data.ingredient.synonyms.eng}
                                            />
                                        </ItemCard>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    )
};

export default IngredientPage;