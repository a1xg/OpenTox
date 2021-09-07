import React from 'react';
import IngredientsList from './IngredientsList/IngredientsList.jsx';
import ProductHazardStatistics from './ProductHazardStatistics/ProductHazardStatistics.jsx';
import style from './SearchResults.module.css';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';

const SearchResults = (props) => {
    console.log('SearchResults props:', props)

    if (props.data.data.product_ingredients.length > 0) {
        return (
            <div>
                <ProductHazardStatistics data={props.data.data} />
                <IngredientsList data={props.data.data} />   
            </div>
        )
    } else {
        return (
            <div><ErrorMessage /></div>
        )
    }
    
    
};

export default SearchResults;