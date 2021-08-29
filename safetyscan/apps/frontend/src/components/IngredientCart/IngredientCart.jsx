import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import {EmptyIngredient} from '../EmptyResults';
import IngredientDetails from "./IngredientDetails/IngredientDetails.jsx";
import IngredientDescription from "./IngredientDescription/IngredientDescription.jsx";
import IngredientHazard from "./IngredientHazard/IngredientHazard.jsx";


const IngredientCart = (props) => {
    console.log('Ingredient cart props', props)
    const url = '/api'+props.location.pathname;
    const [searchResults, setSearchResults] = useState({
        data: EmptyIngredient,
        found:false
        });

    useEffect(() => {
        fetch(url, {method: 'GET'})
        .then(response => {return response.json();})
        .then((data) => {
            setSearchResults({
                data: data, 
                found: true
            });
        });    
    }, []);

    return (
        <div>
            <NavLink to='/search-results'>Back to search results</NavLink>
            <IngredientDetails data={searchResults.data} />
            <IngredientDescription data={searchResults.data}/>
            <IngredientHazard data={searchResults.data}/>
            
        </div>
    )

}; 

export default IngredientCart