import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PercentNotifications from "../PercentNotifications/PercentNotifications.jsx";
import Details from '../Details/Details.jsx';
import Box from '@material-ui/core/Box';
import HazardLevel from "../HazardLevel/HazardLevel.jsx";
import Description from '../Description/Description.jsx';
import ChartDescription from "../ChartDescription/ChartDescription.jsx";
import Synonyms from "../Synonyms/Synonyms.jsx";
import Title from '../Title/Title.jsx';
import IngredientRatingBar from '../../../Charts/IngredientRatingBar.jsx';
import ItemCard from "../../../ItemCard/ItemCard.jsx";
import Breadcrumb from "../Breadcrumb/Breadcrumbs.jsx";
import BackToTopButton from '../../../BackToTopButton/BackToTopButton.jsx'
import useStyles from './styles.js'

const PageMobile = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth={'lg'} className={classes.container}>
            {props.showBreadcrumbs == true &&
                <Breadcrumb namePage={props.searchResults.data.ingredient.main_name} />
            }
            <BackToTopButton>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <ItemCard>
                        <Box sx={{ padding: 10 }}>
                            <Title mainName={props.searchResults.data.ingredient.main_name} />
                            <IngredientRatingBar
                                rating={props.searchResults.data.ingredient.hazard.ingredient_hazard_avg}
                                width={150}
                                height={15}
                            />
                            <Box sx={{ paddingTop: 15 }}>
                                <Details data={props.searchResults.data.ingredient} />
                            </Box>
                        </Box>
                    </ItemCard>
                </Grid>
                {props.searchResults.data.ingredient.description != null &&
                    <Grid item>
                        <ItemCard title='Description'>
                            <Description data={props.searchResults.data.ingredient.description} />
                        </ItemCard>
                    </Grid>
                }
                <Grid item container direction="row" spacing={1}>
                    {props.searchResults.data.ingredient.hazard.ingredient_hazard_avg > 0 &&
                        <Grid item xs={6} >
                            <ItemCard
                                title='Hazard level'
                                caption='For each class'
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
                                title='Credibility'
                                caption='Based on CLP data (%)'
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
                        <ChartDescription data={props.searchResults.data.ingredient.hazard} />
                    </ItemCard>
                </Grid>

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
            </BackToTopButton>
        </Container >
    )
};

export default PageMobile;