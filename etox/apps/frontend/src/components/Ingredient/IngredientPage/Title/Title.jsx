import React from 'react';
import IngredientRatingBar from '../../../Charts/IngredientRatingBar.jsx';
import { Box, Typography } from "@material-ui/core";

const Title = (props) => {
    return (
        <Box>
            <Typography variant='h5'>{props.data.ingredient.main_name}</Typography>
            <IngredientRatingBar 
            rating={props.data.ingredient.hazard.ingredient_hazard_avg} 
            width={200} 
            height={20} 
            />
        </Box>
    )

};

export default Title;