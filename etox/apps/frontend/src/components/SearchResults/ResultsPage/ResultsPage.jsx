import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from '@material-ui/core';
import IngredientsList from './IngredientsList/IngredientsList.jsx';
import HazardLevel from './HazardLevel/HazardLevel.jsx';
import Legend from './Legend/Legend.jsx';
import ProductPhoto from './ProductPhoto/ProductPhoto.jsx';
import VolumeFractions from './VolumeFractions/VolumeFractions.jsx';
import ItemCard from '../../ItemCard/ItemCard.jsx';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    diagram: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        height: '100%',
        width: '100%'
    },
    IngredientsList: {
        padding: theme.spacing(0),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
    },

}));

const ResultsPage = (props) => {
    console.log('ResultsPage props', props)
    const classes = useStyles();

    return (
        <Grid container direction="column" spacing={2} className={classes.root}>
            <Grid item xs={12} >
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={4} >
                        <ItemCard 
                        title='Volume fractions' 
                        caption='The number of ingredients for each hazard class in the product'
                        >
                            <VolumeFractions searchResults={props.searchResults} />
                        </ItemCard>
                    </Grid>
                    <Grid item xs={4} >
                        <ItemCard 
                        title='Hazard level' 
                        caption='The total hazard level for each hazard class of the ingredients of the product' 
                        >
                            <HazardLevel searchResults={props.searchResults} />
                        </ItemCard>
                    </Grid>
                    <Grid item xs={4} >
                        <ItemCard title='Chart legend'>
                            <Legend data={props.searchResults.data} />
                        </ItemCard>
                    </Grid>
                </Grid>
                <Grid item xs container direction="row" spacing={2}>
                    <Grid item xs={8} >
                        <ItemCard title='List of ingredients'>
                            <IngredientsList data={props.searchResults.data} />
                        </ItemCard>
                    </Grid>
                    <Grid item xs={4} >
                        <ItemCard title='Your product image'>
                            <ProductPhoto />
                        </ItemCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default ResultsPage;