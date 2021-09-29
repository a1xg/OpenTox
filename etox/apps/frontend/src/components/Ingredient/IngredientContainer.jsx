import React, { useState, useEffect } from "react";
import { PassIngredient } from '../PassData';
import IngredientPage from './IngredientPage/IngredientPage.jsx';

const IngredientContainer = (props) => {
    console.log('IngredientContainer props', props)
    const [searchResults, setSearchResults] = useState({ found: false, data: PassIngredient });
    document.title = 'Search results';
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
                    document.title = `${data.ingredient.main_name[0]}${data.ingredient.main_name.substring(1).toLowerCase()}`
                });
        };
    }, [searchResults]);

    return (
        <IngredientPage
            searchResults={searchResults}
        />
    )
};

export default IngredientContainer;