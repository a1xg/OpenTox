import React, { useState, useEffect } from "react";
import { PassIngredient, PassChartData } from '../PassData';
import IngredientPage from './IngredientPage/IngredientPage.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const Ingredient = (props) => {
    console.log('Ingredient props', props)
    const [searchResults, setSearchResults] = useState({ found: false, data: PassIngredient });
    useEffect(() => {
        if (searchResults.found == false) {
            const url = '/api' + props.location.pathname;
            fetch(url, { method: 'GET' })
                .then(response => { return response.json(); })
                .then((data) => {
                    setSearchResults({
                        data: data,
                        found: true
                    });
                });
        }
    }, [searchResults]);

    return (
        <IngredientPage
            searchResults={searchResults}
        />
    )
};

export default Ingredient;