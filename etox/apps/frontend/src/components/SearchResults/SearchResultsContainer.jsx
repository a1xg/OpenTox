import React from 'react';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import ResultsPageDesctop from './ResultsPage/PageDesctop/PageDesctop.jsx';
import ResultsPageMobile from './ResultsPage/PageMobile/PageMobile.jsx';
import ProgressBar from './ProgressBar/ProgressBar.jsx';

const SearchResults = (props) => {

    if (props.searchResults.loaded == true) {
        document.title = 'OpenTox - Search results';
        return <ResultsPageDesctop searchResults={props.searchResults} />
    } else if (props.searchResults.loaded == false) {
        document.title = 'Loading...';
        return (
        <ProgressBar />
        )
    } else { 
        document.title = 'Page not found';
        return <ErrorMessage />
     }
};

export default SearchResults;