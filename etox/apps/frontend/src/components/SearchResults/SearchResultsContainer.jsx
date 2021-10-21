import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import PageDesctop from './ResultsPage/PageDesctop/PageDesctop.jsx';
import PageMobile from './ResultsPage/PageMobile/PageMobile.jsx';
import ProgressBar from './ProgressBar/ProgressBar.jsx';

const MobileOrDesctop = () => {
    // if resolution > 'md' breakpoints - return true
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));  
    return matches == true ? 'desctop' : 'mobile'    
  };

const SearchResults = (props) => {
    const displayOption = MobileOrDesctop();

    if (props.searchResults.loaded == true) {
        document.title = 'OpenTox - Search results';
        console.log('SearchResults displayOption', displayOption)
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
};

export default SearchResults;