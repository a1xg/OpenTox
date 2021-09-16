import React, { useState, useEffect } from "react";
import { PassIngredient, PassChartData } from '../PassData';
import { getChartData, getBarData } from '../Charts/ChartTools';
import IngredientPage from './IngredientPage/IngredientPage.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const Ingredient = (props) => {
    console.log('Ingredient props', props)
    const [chartData, setChartData] = useState(PassChartData);
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

        if (searchResults.data.ingredient.hazard.hazard_ghs_set.length > 0) {
            const chartData = getChartData({
                data: searchResults.data.ingredient.hazard.hazard_ghs_set,
                backgroundClarity: '0.4',
                borderClarity: '1'
            });
            setChartData(chartData);
        }
    }, [searchResults]);

    return (
        <IngredientPage
            chartData={chartData}
            searchResults={searchResults}
        />
    )
};

export default Ingredient;