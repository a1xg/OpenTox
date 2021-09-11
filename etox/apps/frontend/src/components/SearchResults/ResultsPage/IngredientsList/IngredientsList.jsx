import { NavLink } from 'react-router-dom';
import React from 'react';
import style from './ingredientsList.module.css'
import IngredientRatingBar from './IngredientRatingBar/IngredientRatingBar.jsx'

const IngredientsList = (props) => {
    const ingredients = props.data.product_ingredients;
    console.log('IngredientsList props:', props)

    return (
        <div>
            <p>Showing: <b>1-{ingredients.length}</b> of results</p>
            <table >
                <tbody>
                    {ingredients.map(ingredient => {
                        return (
                            /* Типовая строка таблицы поисковой выдачи */
                            <tr key={ingredient.id}>
                                <td>
                                        <NavLink to={{
                                            pathname: "ingredient/" + ingredient.id
                                        }}>{ingredient.main_name}
                                        </NavLink>
                                </td>
                                <td>
                                    <div className={style['ingredient-rating']}>
                                        <IngredientRatingBar rating={ingredient.hazard.ingredient_hazard_avg} />          
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
};

export default IngredientsList;
