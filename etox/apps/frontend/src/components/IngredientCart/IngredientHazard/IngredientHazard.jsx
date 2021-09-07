import React from 'react';
import BarChart from '../../Charts/BarChart.jsx';
import HazardBar from '../../Charts/HazardBar.jsx';
import style from './IngredientHazard.module.css';
import { getColors, dictsToArrays } from '../../Charts/ChartTools.js';

const IngredientHazard = (props) => {
    console.log('IngredientHazard props', props)
    const data = dictsToArrays(props.data.ingredient.hazard.hazard_ghs_set);
    console.log('IngredientHazard data', data);
    let descriptions = [];
    let hazard_scale_score = [];
    let percent_notifications = [];

    props.data.ingredient.hazard.hazard_ghs_set.map(item => {
        descriptions.push(item.description);
        hazard_scale_score.push(item.hazard_scale_score);
        percent_notifications.push(item.percent_notifications);
    });

    const colors = getColors({
        numberOfColors: props.data.ingredient.hazard.hazard_ghs_set.length,
        backgroundClarity: '0.4',
        borderClarity: '1'
    });

    return (
        <div className={style['ingredient-hazard-wrapper']}>
            <div className={style['title']}>
                <p>Hazard data</p>
            </div>
            <div className={style['ingredient-rating-bar']}>
                <HazardBar
                    rating={props.data.ingredient.hazard.ingredient_hazard_avg}
                    width={200}
                    height={100}
                    title={'Ingredient hazard'}
                />
            </div>
            <div className={style['hazard-scale-bar']}>
                <BarChart
                    labels={descriptions}
                    data={hazard_scale_score}
                    borderColors={colors.borderColors}
                    backgroundColors={colors.backgroundColors}
                    title={'Hazard level for each class'}
                />
            </div>
            <div className={style['percent-notifications']}>
                <BarChart
                    labels={descriptions}
                    data={percent_notifications}
                    borderColors={colors.borderColors}
                    backgroundColors={colors.backgroundColors}
                    title={'Percent notifications from company'}
                />
            </div>
            <div className={style['footer']}>
                <p>Total notifications:  {props.data.ingredient.hazard.total_notifications} </p>
                <p>Sourse: <a
                    href={"https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/" + props.data.ingredient.hazard.cl_inventory_id}>European
                    Chemicals Agency (ECHA)</a></p>
            </div>
        </div>
    )

};

export default IngredientHazard