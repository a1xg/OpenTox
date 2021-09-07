import React from 'react';
import IngredientsList from './IngredientsList/IngredientsList.jsx';
import ProductHazardStatistics from './ProductHazardStatistics/ProductHazardStatistics.jsx';
import style from './SearchResults.module.css';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';

const SearchResults = (props) => {
    console.log('SearchResults props:', props);
        if (props.searchResults.loaded == true) {
            return (
                <div>
                    <ProductHazardStatistics data={props.searchResults.data} />
                    <IngredientsList data={props.searchResults.data} />
                </div>
            )
        } else if (props.searchResults.loaded == false) {
            return (<div></div>)
        } else {return (<ErrorMessage />)}      
    };

export default SearchResults;