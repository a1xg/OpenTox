import React from 'react';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import PageDesctop from './ResultsPage/PageDesctop/PageDesctop.jsx';
import PageMobile from './ResultsPage/PageMobile/PageMobile.jsx';
import ProgressBar from './ProgressBar/ProgressBar.jsx';
import {MobileOrDesctop} from '../tools.js'

const SearchResults = (props) => {
    const displayOption = MobileOrDesctop();
    if (props.searchResults != null) {
        if (props.searchResults.loaded == true) {
            document.title = 'OpenTox - Search results';
            if (displayOption == 'desctop') {
                return <PageDesctop searchResults={props.searchResults} />
            };
            if (displayOption == 'mobile') {
                return <PageMobile searchResults={props.searchResults} />
            }
        } else if (props.searchResults.loaded == false) {
            document.title = 'Loading...';
            return (
            <ProgressBar />
            )
        } else { 
            document.title = 'Page not found';
            return <ErrorMessage />
        }
    } else {
        return <ErrorMessage />
    }
};

export default SearchResults;