import React from 'react';
import style from '../../style.module.css';
import Chart from './Chart.jsx';

const ProductHazardTable = (props) => {
    console.log('ProductHazardTable props:', props)

    return (
        <div className="alert alert-warning">
            <p>Product hazard statistics</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Hazard Class</th>
                        <th scope="col">Hazard abbr and category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Number of ingredients with this hazard class</th>
                        <th scope="col">Hazard scale score</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.detail_hazard_product.map(data => {
                        return (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.hazard_class}</td>
                                <td>{[data.abbreviation, data.hazard_category].join(' ')}</td>
                                <td>{data.description}</td>
                                <td>{data.num_of_ingredients}</td>
                                <td>{data.hazard_scale_score}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="header_block"><p>Total average hazard: {props.data.product_hazard_avg}/10</p></div>
            

            <Chart data={props.data} />
        </div>
    )
};

export default ProductHazardTable
