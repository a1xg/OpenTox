import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Button, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

const IngredientPage = (props) => {
    console.log('IngredientPage props', props)
    const classes = useStyles();
    return (
        <Grid container direction="row" spacing={2} >
            <Grid item container xs={3} direction='column' spacing={2}>
                {props.backButton == true &&
                    <Grid item >
                        <NavLink to='/search-results' style={{'text-decoration': 'none'}}>
                        <Button 
                        xs={12}
                        variant="contained" 
                        style={{display: 'flex', width:'100%', background:'white'}}
                        startIcon={<ArrowBackIosIcon />
                        
                        }>
                        Back to search results
                        </Button>
                        </NavLink>
                    </Grid>
                }
                <Grid item>
                    <ItemCard title='Ingredient name'>
                        <Title mainName={props.searchResults.data.ingredient.main_name} />
                        <IngredientRatingBar
                            rating={props.searchResults.data.ingredient.hazard.ingredient_hazard_avg}
                            width={200}
                            height={20}
                        />
                    </ItemCard>
                </Grid>
                <Grid item>
                    <ItemCard title='Details'>
                        <Details data={props.searchResults.data.ingredient} />
                    </ItemCard>
                </Grid>

            </Grid>

            <Grid item container xs={9} direction="column" spacing={2}>
                <Grid item container direction="row" spacing={2} >
                    {props.searchResults.data.ingredient.hazard.hazard_ghs_set.length > 0 &&
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
                <Grid item>
                    <ItemCard title='Chart description'>
                        <Legend data={props.searchResults.data.ingredient.hazard} />
                    </ItemCard>
                </Grid>
                {props.searchResults.data.ingredient.description != null &&
                    <Grid item>
                        <ItemCard title='Description'>
                            <Description data={props.searchResults.data.ingredient.description} />
                        </ItemCard>
                    </Grid>
                }
                {props.searchResults.data.ingredient.synonyms != null &&
                    props.searchResults.data.ingredient.synonyms.eng != null &&
                    <Grid item>
                        <ItemCard title='Synonyms'>
                            <Synonyms
                                data={props.searchResults.data.ingredient.synonyms.eng}
                            />
                        </ItemCard>
                    </Grid>
                }
            </Grid>
        </Grid>
    )
};

export default IngredientPage;