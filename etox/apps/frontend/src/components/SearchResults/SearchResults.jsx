import React, { useState, useEffect } from "react";
import { PassChartData } from "../PassData";
//import { getChartData, getData, getBarData } from '../Charts/ChartTools';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const SearchResults = (props) => {
    console.log('SearchResults props:', props);
    //const [chartData, setChartData] = useState(PassChartData);


    if (props.searchResults.loaded == true) {
        return (
            <ResultsPage
                searchResults={props.searchResults}
                //chartData={chartData}
            />
        )

    } else if (props.searchResults.loaded == false) {
        return (<LinearProgress />)
    } else { return (<ErrorMessage />) }
};

export default SearchResults;