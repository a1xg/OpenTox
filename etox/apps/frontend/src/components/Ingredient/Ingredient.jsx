import React, { useState, useEffect } from "react";
import { EmptyIngredient } from '../EmptyResults';
import { getColors, dictsToArrays } from '../Charts/ChartTools';
import IngredientPage from './IngredientPage/IngredientPage.jsx';

const Ingredient = (props) => {
    console.log('Ingredient cart props', props)
    const url = '/api' + props.location.pathname;
    const [searchResults, setSearchResults] = useState({
        data: EmptyIngredient,
        found: false
    });
    // !FIXME данных в hazard.hazard_ghs_set может и не быть и надо это предусмотреть, желательно сделать централизованную валидацию 
    const data = dictsToArrays(searchResults.data.ingredient.hazard.hazard_ghs_set);
    const colors = getColors({
        numberOfColors: searchResults.data.ingredient.hazard.hazard_ghs_set.length,
        backgroundClarity: '0.4',
        borderClarity: '1'
    });

    useEffect(() => {
        fetch(url, { method: 'GET' })
            .then(response => { return response.json(); })
            .then((data) => {
                setSearchResults({
                    data: data,
                    found: true
                });
            });
    }, []);

    return (
        <IngredientPage data={data} colors={colors} searchResults={searchResults} />
    )
};

export default Ingredient;