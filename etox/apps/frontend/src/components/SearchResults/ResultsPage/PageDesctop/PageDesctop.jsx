import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IngredientsList from '../IngredientsList/IngredientsList.jsx';
import HazardLevel from '../HazardLevel/HazardLevel.jsx';
import LegendVertical from '../../../Charts/LegendVertical/LegendVertical.jsx';
import ProductPhoto from '../ProductPhoto/ProductPhoto.jsx';
import ProductStatistics from '../ProductStatistics/ProductStatistics.jsx';
import ItemCard from '../../../ItemCard/ItemCard.jsx';
import BackToTopButton from '../../../BackToTopButton/BackToTopButton.jsx';

import useStyles from './styles.js';

const PageDesctop = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth={'lg'}>
            <BackToTopButton>
            <Grid container direction="row" spacing={0} className={classes.root}>
                <Grid item xs={10} container direction="column" spacing={2} >
                    <Grid item container direction="row" spacing={2} >
                        <Grid item xs={6} >
                            {props.searchResults.data.detail_hazard_product.length > 0 &&
                                <ItemCard
                                    title='Product hazard statistics'
                                    caption='Number of ingredients with hazard class'
                                >
                                    <ProductStatistics data={props.searchResults.data} />
                                </ItemCard>
                            }
                        </Grid>
                        <Grid item xs={6} >
                            {props.searchResults.data.detail_hazard_product.length > 0 &&
                                <ItemCard
                                    title='Product hazard level'
                                    caption='Total hazard level for all ingredients'
                                >
                                    <HazardLevel data={props.searchResults.data.detail_hazard_product} />
                                </ItemCard>
                            }
                        </Grid>
                    </Grid>
                    <Grid item >
                        <ItemCard 
                        title='Ingredients' 
                        caption={`Total: ${props.searchResults.data.product_ingredients.length}`}
                        >
                            <IngredientsList ingredients={props.searchResults.data.product_ingredients} />
                        </ItemCard>
                    </Grid>
                </Grid>
                <Grid item xs={2} container direction="column" spacing={2}>
                    <Grid item>
                        {props.searchResults.data.detail_hazard_product.length > 0 &&
                            <ItemCard title='Description'>
                                <LegendVertical data={props.searchResults.data.detail_hazard_product} />
                            </ItemCard>
                        }
                    </Grid>
                    <Grid item>
                        {props.searchResults.data.image_with_ingredients != null &&
                            <ItemCard title='Product image'>
                                <ProductPhoto image={props.searchResults.data.image_with_ingredients} />
                            </ItemCard>
                        }
                    </Grid>
                </Grid>
            </Grid>
            </BackToTopButton>
        </Container>
    )
};

export default PageDesctop;