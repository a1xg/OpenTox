import { NavLink } from 'react-router-dom';
import React from 'react';
import HazardBar from '../../Charts/HazardBar.jsx';
import style from '../../style.module.css'
import localStyle from './ingredientsList.module.css'

const IngredientsList = (props) => {
    const ingredients = props.data.product_ingredients;
    console.log('IngredientsList props:', props)

    return (
        <div className="row">
            <div className="col-12">
                <div className={[style['card'], style['card-margin']].join(' ')}>
                    <div className="card-body">
                        <div className={['row', style['search-body']]}>
                            <div className="col-lg-12">
                                <div className={style['search-result']}>
                                    {/* Заголовок результатов поиска */}
                                    <div className={style['result-header']}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className={style['records']}>Showing: <b>1-{/* results.product_ingredients | length */}</b> of results</div>
                                            </div>
                                            <div className="col-lg-6">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-body">
                                        <div className="table-responsive">
                                            <table className={['table', style['widget-26']].join(' ')}>
                                                <tbody>
                                                    {ingredients.map(ingredient => {
                                                        return (
                                                            /* Типовая строка таблицы поисковой выдачи */
                                                            <tr key={ingredient.id}>
                                                                <td>
                                                                    <div className={style['widget-26-job-emp-img']}>
                                                                        <img
                                                                            src="http://iconsetc.com/icons-watermarks/flat-square-white-on-black/bfa/bfa_flask/bfa_flask_flat-square-white-on-black_128x128.png"
                                                                            alt="Ingredient" />
                                                                    </div>

                                                                </td>
                                                                <td>
                                                                    <div className={style['widget-26-job-title']}>
                                                                        <NavLink to={{
                                                                            pathname: "ingredient/" + ingredient.id
                                                                        }}>{ingredient.main_name}
                                                                        </NavLink>
                                                                        <p className="m-0">
                                                                            <span className={['text-muted', style['time']].join(' ')}>{ingredient.id}</span>
                                                                        </p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className={localStyle['ingredient-rating']}>
                                                                        <HazardBar
                                                                            rating={ingredient.hazard.ingredient_hazard_avg}
                                                                            width={200}
                                                                            height={100}
                                                                            title={'Ingredient rating'} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default IngredientsList
