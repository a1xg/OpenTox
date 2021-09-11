import React from 'react';
import { getColors, dictsToArrays } from '../Charts/ChartTools';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';

// !FIXME данных в hazard.hazard_ghs_set может и не быть и надо это предусмотреть, желательно сделать централизованную валидацию 
const SearchResults = (props) => {
    console.log('SearchResults props:', props);
    if (props.searchResults.loaded == true) {
        const data = dictsToArrays(props.searchResults.data.detail_hazard_product);
        const colors = getColors({
            numberOfColors: props.searchResults.data.detail_hazard_product.length,
            backgroundClarity: '0.4',
            borderClarity: '1'
        });
        return (
            <ResultsPage searchResults={props.searchResults} data={data} colors={colors} />
        )
    } else if (props.searchResults.loaded == false) {
        return (<div>Loading</div>)
    } else { return (<ErrorMessage />) }
};

export default SearchResults;