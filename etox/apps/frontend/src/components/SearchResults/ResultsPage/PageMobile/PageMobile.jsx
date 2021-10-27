import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IngredientsList from '../IngredientsList/IngredientsList.jsx';
import HazardLevel from '../HazardLevel/HazardLevel.jsx';
import LegendHorizontal from '../../../Charts/LegendHorizontal/LegendHorizontal.jsx';
import ProductPhoto from '../ProductPhoto/ProductPhoto.jsx';
import ProductStatistics from '../ProductStatistics/ProductStatistics.jsx';
import ItemCard from '../../../ItemCard/ItemCard.jsx';
import useStyles from './styles.js';
import BackToTopButton from '../../../BackToTopButton/BackToTopButton.jsx';

const PageMobile = (props) => {
    const classes = useStyles();
    
    return (
        <Container maxWidth={'md'} className={classes.container} >
            <BackToTopButton>
            <Grid container direction="column" spacing={2} className={classes.gridCol}>
                <Grid item xs={12} container direction="row" spacing={2} className={classes.gridRow1}>
                    <Grid item xs={6} >
                        {props.searchResults.data.detail_hazard_product.length > 0 &&
                            <ItemCard
                                title='Product statistics'
                                caption='Ingredients with hazard class'
                            >
                                <ProductStatistics data={props.searchResults.data} />
                            </ItemCard>
                        }
                    </Grid>
                    <Grid item xs={6} >
                        {props.searchResults.data.detail_hazard_product.length > 0 &&
                            <ItemCard
                                title='Product hazard level'
                                caption='Based on all ingredients'
                            >
                                <HazardLevel data={props.searchResults.data.detail_hazard_product} />
                            </ItemCard>
                        }
                    </Grid>
                </Grid>
                
                <Grid item xs={12} className={classes.gridRow2}>
                {props.searchResults.data.detail_hazard_product.length > 0 &&
                            <ItemCard title='Descripion'>
                                <LegendHorizontal data={props.searchResults.data.detail_hazard_product} />
                            </ItemCard>
                        }
                </Grid>
                <Grid item xs={12} className={classes.gridRow3} >
                        <ItemCard 
                        title='Ingredients' 
                        caption={`Total: ${props.searchResults.data.product_ingredients.length}`}
                        >
                            <IngredientsList ingredients={props.searchResults.data.product_ingredients} />
                        </ItemCard>
                </Grid>
                <Grid item xs={12} className={classes.gridRow3} >
                {props.searchResults.data.image_with_ingredients != null &&
                            <ItemCard title='Product image'>
                                <ProductPhoto image={props.searchResults.data.image_with_ingredients} />
                            </ItemCard>
                        }
                </Grid>
            </Grid>
            </BackToTopButton>
        </Container>
       
    )
};

export default PageMobile;