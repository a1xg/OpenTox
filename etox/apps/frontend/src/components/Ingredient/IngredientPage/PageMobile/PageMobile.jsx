import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PercentNotifications from "../PercentNotifications/PercentNotifications.jsx";
import IngredientRatingBar from '../../../Charts/IngredientRatingBar.jsx';
import Description from "../Description/Description.jsx";
import HazardLevel from "../HazardLevel/HazardLevel.jsx";
import Details from "../Details/Details.jsx";
import Title from "../Title/Title.jsx";
import ChartDescription from "../ChartDescription/ChartDescription.jsx";
import Synonyms from "../Synonyms/Synonyms.jsx";
import ItemCard from "../../../ItemCard/ItemCard.jsx";
import Breadcrumb from "../Breadcrumb/Breadcrumbs.jsx";
import useStyles from "./styles.js";

const PageMobile = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth={'lg'}>
            {props.showBreadcrumbs == true &&
                <Breadcrumb namePage={props.searchResults.data.ingredient.main_name} />
            }
            <Grid container direction='column' spacing={1} className={classes.grid}>
                <Grid item xs={12} container direction="row" spacing={1} className={classes.gridRow1}>
                    <Grid item xs={6} >
                        <Grid container direction='column' spacing={1} className={classes.grid}>
                            <Grid item>
                                <ItemCard>
                                    <Title mainName={props.searchResults.data.ingredient.main_name} />
                                    <IngredientRatingBar
                                        rating={props.searchResults.data.ingredient.hazard.ingredient_hazard_avg}
                                        width={150}
                                        height={15}
                                    />
                                </ItemCard>

                            </Grid>
                            <Grid item>
                                <ItemCard title='Ingredient description'>
                                    <Description data={props.searchResults.data.ingredient.description} />
                                </ItemCard>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} >
                        <ItemCard title='Details'>
                            <Details data={props.searchResults.data.ingredient} />
                        </ItemCard>
                    </Grid>
                </Grid>


                <Grid item xs={12} container direction="row" spacing={1} className={classes.gridRow1}>
                    <Grid item xs={6} >
                        <ItemCard
                            title='Hazard level'
                            caption='Hazard level for each hazard class for the ingredient'
                        >
                            <HazardLevel
                                data={props.searchResults.data.ingredient.hazard.hazard_ghs_set}
                            />
                        </ItemCard>
                    </Grid>
                    <Grid item xs={6} >
                        <ItemCard
                            title='Data probability (%)'
                            caption='Probability based on the number of notifications in the system of CLP'
                        >
                            <PercentNotifications
                                data={props.searchResults.data.ingredient.hazard.hazard_ghs_set}
                            />
                        </ItemCard>
                    </Grid>
                    <Grid item xs={12}>
                        <ItemCard title='Chart description'>
                            <ChartDescription data={props.searchResults.data.ingredient.hazard} />
                        </ItemCard>
                    </Grid>

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
        </Container >
    )
};

export default PageMobile;