import React, { useState, useEffect } from "react";
import { EmptyIngredient, EmptyChartData } from '../EmptyResults';
import { getColors, dictsToArrays, getChartData } from '../Charts/ChartTools';
import IngredientPage from './IngredientPage/IngredientPage.jsx';
import ErrorMessage from "../SearchResults/ErrorMessage/ErrorMessage.jsx";
import LinearProgress from '@material-ui/core/LinearProgress';

const Ingredient = (props) => {
    console.log('Ingredient props', props)
    const [searchResults, setSearchResults] = useState({
        found: false,
        data: EmptyIngredient
    });
    const [chartData, setChartData] = useState({
        datasets: EmptyChartData,
        colors: {
            borderColors: [],
            backgroundColors: []
        }
    })
  
    React.useEffect(() => {
        const url = '/api' + props.location.pathname;
        fetch(url, { method: 'GET' })
            .then(response => { return response.json(); })
            .then((data) => {
                setSearchResults({
                    data: data,
                    found: true
                });
            });
    }, []);

    React.useEffect(() => {
        // !FIXME данных в hazard.hazard_ghs_set может и не быть и надо это обработать
        const chartData = getChartData({
            data: searchResults.data.ingredient.hazard.hazard_ghs_set,
            backgroundClarity: '0.4',
            borderClarity: '1'
        });
        setChartData(chartData);

    }, [searchResults]);


    return (
        <IngredientPage
            chartData={chartData}
            searchResults={searchResults}
        />
    )


};

export default Ingredient;