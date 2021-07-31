import React from 'react';


const ProductHazardTable = (props) => {
    return (
        <div className="alert alert-warning">
            <p>Product hazard statistics</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Hazard Class</th>
                        <th scope="col">Hazard abbr and category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Number of ingredients with this hazard class</th>
                        <th scope="col">Hazard scale score</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.detail_hazard_product.map(h => {
                        return (
                            <tr key={[h.abbreviation, h.hazard_category].join(' ')}>
                                <td>{h.hazard_class}</td>
                                <td>{[h.abbreviation, h.hazard_category].join(' ')}</td>
                                <td>{h.description}</td>
                                <td>{h.num_of_ingredients}</td>
                                <td>{h.hazard_scale_score}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="header_block"><p>Total average hazard: {props.data.product_hazard_avg}/10</p></div>
        </div>
    )
}

export default ProductHazardTable;
