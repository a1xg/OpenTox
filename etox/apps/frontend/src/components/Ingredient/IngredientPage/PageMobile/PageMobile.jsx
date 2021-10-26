import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PercentNotifications from "../PercentNotifications/PercentNotifications.jsx";
import DescriptionMobile from "../Description/DescriptionMobile/DescriptionMobile.jsx";
import HazardLevel from "../HazardLevel/HazardLevel.jsx";
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
            <Grid container 
            direction='column' 
            spacing={2} 
            >
                <Grid item container direction='row'>
                    <Grid item xs>
                    <ItemCard>
                        <DescriptionMobile searchResults={props.searchResults} />
                    </ItemCard>
                    </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1}>
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

        </Container >
    )
};

export default PageMobile;