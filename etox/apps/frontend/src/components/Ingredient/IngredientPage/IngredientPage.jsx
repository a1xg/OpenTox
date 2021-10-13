import React from "react";
import { Grid, Container, makeStyles } from '@material-ui/core';
import PercentNotifications from "./PercentNotifications/PercentNotifications.jsx";
import IngredientRatingBar from '../../Charts/IngredientRatingBar.jsx';
import Description from "./Description/Description.jsx";
import HazardLevel from "./HazardLevel/HazardLevel.jsx";
import Details from "./Details/Details.jsx";
import Title from "./Title/Title.jsx";
import Legend from "./Legend/Legend.jsx";
import Synonyms from "./Synonyms/Synonyms.jsx";
import ItemCard from "../../ItemCard/ItemCard.jsx";
import Breadcrumb from "./Breadcrumb/Breadcrumbs.jsx";

const useStyles = makeStyles((theme) => ({
    root:{
        alignItems: 'center',
    },
    topGrid: {
        flexGrow: 1,
        width: "100%",
        justifyContent: 'space-around',
    },
    col1: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        height:'100%'
    },
    col2: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        height:'100%'
    },
    col2row:{
        alignItems: 'center'
    },
    bottomGrid:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //width:'100%'
    }
}));


const IngredientPage = (props) => {
    console.log('IngredientPage props', props)
    const classes = useStyles();
    return (
        <Container maxWidth={'lg'}>
            {props.backButton == true &&
                <Breadcrumb namePage={props.searchResults.data.ingredient.main_name} />
            }
            <Grid container direction="column" spacing={2} className={classes.root}>

            <Grid item xs={12} container direction="row" spacing={0} className={classes.topGrid} >
                <Grid item container xs={4} direction='column' spacing={2} className={classes.col1}>
                    <Grid item>
                        <ItemCard title='Ingredient name'>
                            <Title mainName={props.searchResults.data.ingredient.main_name} />
                            <IngredientRatingBar
                                rating={props.searchResults.data.ingredient.hazard.ingredient_hazard_avg}
                                width={150}
                                height={15}
                            />
                        </ItemCard>
                    </Grid>
                    <Grid item>
                        <ItemCard title='Details'>
                            <Details data={props.searchResults.data.ingredient} />
                        </ItemCard>
                    </Grid>
                    {props.searchResults.data.ingredient.description != null &&
                        <Grid item>
                            <ItemCard title='Ingredient description'>
                                <Description data={props.searchResults.data.ingredient.description} />
                            </ItemCard>
                        </Grid>
                    }
                </Grid>

                <Grid item container xs={8} direction="column" spacing={2} className={classes.col2}>
                    <Grid item container direction="row" spacing={2} className={classes.col2row}>
                        {props.searchResults.data.ingredient.hazard.ingredient_hazard_avg > 0 &&
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
                        }
                        {props.searchResults.data.ingredient.hazard.hazard_ghs_set.length > 0 &&
                            <Grid item xs={6} >
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
                    <Grid item >
                        <ItemCard title='Chart description'>
                            <Legend data={props.searchResults.data.ingredient.hazard} />
                        </ItemCard>
                    </Grid>
                </Grid>
            </Grid>
            {props.searchResults.data.ingredient.synonyms != null &&
                    props.searchResults.data.ingredient.synonyms.eng != null &&
                        <Grid item container xs={12} direction="row" spacing={2} className={classes.bottomGrid}>
                            <Grid item xs={12}>
                            <ItemCard title='Synonyms'>
                                <Synonyms
                                    data={props.searchResults.data.ingredient.synonyms.eng}
                                />
                            </ItemCard>
                            </Grid>
                    </Grid>
                }
            </Grid>
        </Container >
    )
};

export default IngredientPage;