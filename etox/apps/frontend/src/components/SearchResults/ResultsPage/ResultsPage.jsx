import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import IngredientsList from './IngredientsList/IngredientsList.jsx';
import HazardLevel from './HazardLevel/HazardLevel.jsx';
import Legend from './Legend/Legend.jsx';
import ProductPhoto from './ProductPhoto/ProductPhoto.jsx';
import VolumeFractions from './VolumeFractions/VolumeFractions.jsx';
import ItemCard from '../../ItemCard/ItemCard.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    charts: {
        flexGrow: 1,
    }

}));

const ResultsPage = (props) => {
    console.log('ResultsPage props', props)
    const classes = useStyles();

    return (
        <Grid container direction="row" spacing={3} >
            <Grid item xs={9} container direction="column" spacing={3} >
                <Grid item container direction="row" spacing={3} className={classes.charts} >
                    <Grid item xs={6} >
                        {props.searchResults.data.detail_hazard_product.length > 0 &&
                            <ItemCard
                                title='Volume fractions'
                                caption='The number of ingredients for each hazard class in the product'
                            >
                                <VolumeFractions data={props.searchResults.data} />
                            </ItemCard>
                        }
                    </Grid>
                    <Grid item xs={6} >
                        {props.searchResults.data.detail_hazard_product.length > 0 &&
                            <ItemCard
                                title='Hazard level'
                                caption='The total hazard level for each hazard class of the ingredients of the product'
                            >
                                <HazardLevel data={props.searchResults.data.detail_hazard_product} />
                            </ItemCard>
                        }
                    </Grid>
                </Grid>
                <Grid item >
                    <ItemCard title='List of ingredients'>
                        <IngredientsList data={props.searchResults.data} />
                    </ItemCard>
                </Grid>
            </Grid>

            <Grid item xs={3} container direction="column" spacing={3}>
                <Grid item >
                    {props.searchResults.data.detail_hazard_product.length > 0 &&
                        <ItemCard title='Chart descripion'>
                            <Legend data={props.searchResults.data.detail_hazard_product} />
                        </ItemCard>
                    }
                </Grid>
                <Grid item >
                    {props.searchResults.data.image != null &&
                        <ItemCard title='Your product image'>
                            <ProductPhoto />
                        </ItemCard>
                    }
                </Grid>
            </Grid>
        </Grid>
    )
};

export default ResultsPage;