import React, { useState, useEffect } from "react";
import { capitalize } from "@material-ui/core";
import { PassIngredient } from '../PassData';
import IngredientPage from './IngredientPage/IngredientPage.jsx';

const IngredientContainer = (props) => {
    const [searchResults, setSearchResults] = useState({ found: false, data: PassIngredient });
    document.title = 'Search results';
    useEffect(() => {
        if (searchResults.found == false) {
            const url = '/api' + props.data.location.pathname;
            fetch(url, { method: 'GET' })
                .then(response => { return response.json(); })
                .then((data) => {
                    setSearchResults({
                        data: data,
                        found: true,
                    });
                    document.title = capitalize(data.ingredient.main_name.toLowerCase())
                });
                return () => {
                    // cleaning
                    setSearchResults({ 
                        found: false, 
                        data: PassIngredient 
                    });
                };
        };
    }, []);

    return (
        <IngredientPage
            searchResults={searchResults}
            backButton={props.backButton}
        />
    )
};

export default IngredientContainer;