import React from 'react';
import IngredientsList from './IngredientsList/IngredientsList.jsx';
import ProductHazardTable from './ProductHazardTable/ProductHazardTable.jsx';
import style from '../style.module.css';

const SearchResults = (props) => {
    console.log('SearchResults props:', props)
    if (props.data.found) {
        return (
            <div className={style['container']}>
                <ProductHazardTable data={props.data.data} />
                <IngredientsList data={props.data.data} />   
            </div>
        )
    }
    return (
        <div></div>
    )
    
};

export default SearchResults