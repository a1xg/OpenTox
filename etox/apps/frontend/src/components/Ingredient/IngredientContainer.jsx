import React, { useState, useEffect } from "react";
import { capitalize } from "@material-ui/core";
import { PassIngredient } from '../PassData';
import PageDesctop from './IngredientPage/PageDesctop/PageDesctop.jsx';
import PageMobile from "./IngredientPage/PageMobile/PageMobile.jsx";
import { MobileOrDesctop } from "../tools.js";
import Container from "@material-ui/core/Container";

const IngredientContainer = (props) => {
    const [searchResults, setSearchResults] = useState({ found: false, data: PassIngredient });
    const displayOption = MobileOrDesctop();
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

    if (displayOption == 'desctop') {
        return (
            <PageDesctop
                searchResults={searchResults}
                showBreadcrumbs={props.showBreadcrumbs}
            />
        )
    } else if (displayOption == 'mobile') {
        return (
            <PageMobile
                searchResults={searchResults}
                showBreadcrumbs={props.showBreadcrumbs}
            />
        )
    }

};

export default IngredientContainer;