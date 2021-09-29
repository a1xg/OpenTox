import React from 'react';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const SearchResults = (props) => {
    console.log('SearchResults props:', props);

    if (props.searchResults.loaded == true) {
        document.title = 'Search results';
        return (
            <ResultsPage searchResults={props.searchResults} />
        )
    } else if (props.searchResults.loaded == false) {
        document.title = 'Loading...';
        return (<LinearProgress />)
    } else { 
        document.title = 'Page not found';
        return (<ErrorMessage />) }
};

export default SearchResults;