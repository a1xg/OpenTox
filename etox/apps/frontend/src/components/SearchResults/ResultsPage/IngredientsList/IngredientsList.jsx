import React from "react";
import { NavLink } from 'react-router-dom';
import IngredientRatingBar from './IngredientRatingBar/IngredientRatingBar.jsx';
import BriefStatistics from './BriefStatistics/BriefStatistics.jsx';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1)
    },
    header:{

    }
}));

const IngredientsList = (props) => {
    const ingredients = props.data.product_ingredients;
    const classes = useStyles();
    console.log('IngredientsList props:', props);

    return (
        <Grid container direction="column" spacing={1} className={classes.root}>
            <Grid item >
                <Typography variant='h6'>Showing 1-{ingredients.length} of results</Typography>
            </Grid>
            <Grid item xs container direction='row' className={classes.header}>
                <Grid item xs={4}>
                    <Typography variant='subtitle1'>Name</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='subtitle1'>Hazard classes</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant='subtitle1'>Rating</Typography>
                </Grid>
            </Grid>

            {ingredients.map(ingredient => {
                return (
                    <Grid item xs container direction="row" spacing={1} key={ingredient.id}>
                        <Grid item xs={4}>
                            <NavLink to={{ pathname: "ingredient/" + ingredient.id }}>
                                <Typography variant='h6'>
                                    {ingredient.main_name}
                                </Typography>
                            </NavLink>
                        </Grid>
                        <Grid item xs={4}>
                            <BriefStatistics data={ingredient.hazard.hazard_ghs_set} />
                        </Grid>
                        <Grid item xs={4}>
                            <IngredientRatingBar rating={ingredient.hazard.ingredient_hazard_avg} />
                        </Grid>
                    </Grid>
                )
            })}

        </Grid>


    )
};

export default IngredientsList;
