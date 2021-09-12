import React from 'react';
import { getChartData } from '../Charts/ChartTools';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const SearchResults = (props) => {
    console.log('SearchResults props:', props);
    if (props.searchResults.loaded == true) {
        // !FIXME данных в detail_hazard_product может и не быть и надо это обработать.
        const chartData = getChartData({
            data: props.searchResults.data.detail_hazard_product,
            backgroundClarity: '0.4',
            borderClarity: '1'
        });

        return (
            <ResultsPage
                searchResults={props.searchResults}
                chartData={chartData}
                chartData={chartData}
            />
        )
    } else if (props.searchResults.loaded == false) {
        return (<LinearProgress />)
    } else { return (<ErrorMessage />) }
};

export default SearchResults;