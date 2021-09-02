import React from 'react';
import IngredientsList from './IngredientsList/IngredientsList.jsx';
import ProductHazardStatistics from './ProductHazardStatistics/ProductHazardStatistics.jsx';
import style from '../style.module.css';

const SearchResults = (props) => {
    console.log('SearchResults props:', props)
    if (props.data.found) {
        return (
            <div className={style['container']}>
                <ProductHazardStatistics data={props.data.data} />
                <IngredientsList data={props.data.data} />   
            </div>
        )
    }
    return (
        <div></div>
    )
    
};

export default SearchResults