import React from 'react';
import { getColors } from '../../Charts/ChartTools';
import DoughnutChart from '../../Charts/DoughnutChart.jsx';
import BarChart from '../../Charts/BarChart.jsx';
import HazardBar from '../../Charts/HazardBar.jsx';
import style from './ProductHazardStatistics.module.css';


const ProductHazardStatistics = (props) => {
    console.log('ProductHazardStatistics props:', props)

    let descriptions = [];
    let num_of_ingredients = [];
    let hazard_scale_score = [];

    props.data.detail_hazard_product.map(item => {
        descriptions.push(item.description);
        num_of_ingredients.push(item.num_of_ingredients);
        hazard_scale_score.push(item.hazard_scale_score);
    });

    const colors = getColors({
        numberOfColors: props.data.detail_hazard_product.length,
        backgroundClarity: '0.4',
        borderClarity: '1'
    });

    return (
        <div>
            <p>Product hazard statistics</p>
            <div className={style['chart-wrapper']}>
                <div className={style['doughnut-chart']}>
                    <div className={style['chart']}>
                        <DoughnutChart
                            labels={descriptions}
                            data={num_of_ingredients}
                            borderColors={colors.borderColors}
                            backgroundColors={colors.backgroundColors}
                        />
                    </div>
                </div>

                <div className={style['bar-chart']}>
                    <div className={style['chart']}>
                        <BarChart
                            labels={['','','','','','']}
                            data={hazard_scale_score}
                            borderColors={colors.borderColors}
                            backgroundColors={colors.backgroundColors}
                            title={'Hazard level for each class'}
                        />
                    </div>
                </div>
                
                <div className={style['product-rating']} >
                    <div className={style['chart']}>
                        <HazardBar
                            rating={props.data.product_hazard_avg}
                            width={160}
                            height={80}
                            title={'Product hazard'}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
};

export default ProductHazardStatistics;
