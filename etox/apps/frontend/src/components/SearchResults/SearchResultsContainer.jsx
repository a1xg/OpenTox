import React from 'react';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const SearchResults = (props) => {
    console.log('SearchResults props:', props);

    if (props.searchResults.loaded == true) {
        return (
            <ResultsPage
                searchResults={props.searchResults}
            />
        )

    } else if (props.searchResults.loaded == false) {
        return (<LinearProgress />)
    } else { return (<ErrorMessage />) }
};

export default SearchResults;