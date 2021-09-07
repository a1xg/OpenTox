import { NavLink } from 'react-router-dom';
import React from 'react';
import HazardBar from '../../Charts/HazardBar.jsx';
import style from './ingredientsList.module.css'

const IngredientsList = (props) => {
    const ingredients = props.data.product_ingredients;
    console.log('IngredientsList props:', props)

    return (
        <div>

            <div>Showing: <b>1-{ingredients.length}</b> of results</div>

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
                                        <HazardBar
                                            rating={ingredient.hazard.ingredient_hazard_avg}
                                            width={200}
                                            height={100}
                                            title={'Ingredient hazard'} />
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
