import React from 'react';
import BarChart from '../../Charts/BarChart.jsx';
import HazardBar from '../../Charts/HazardBar.jsx';

const IngredientHazard = (props) => {
    console.log('IngredientHazard props', props)

    




    return (
        <div className="alert alert-warning">


            <div className="header_block"><p>Hazard data</p></div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="col">Hazard Class</th>
                        <th className="col">Hazard Category</th>
                        <th className="col">Hazard Statement Code</th>
                        <th className="col">Description</th>
                        <th className="col">Number of Notifiers</th>
                        <th className="col">Percent notifications</th>
                        <th className="col">Hazard scale</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.ingredient.hazard.hazard_ghs_set.map(item => {
                        return (
                            <tr key={item.id}>
                                <td> {item.abbreviation}</td>
                                <td> {item.hazard_category} </td>
                                <td> {item.ghs_code} </td>
                                <td> {item.description} </td>
                                <td> {item.number_of_notifiers} </td>
                                <td>
                                    <p> {item.percent_notifications} %</p>
                                </td>
                                <td>
                                    <p> {item.hazard_scale_score} /10</p>
                                </td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
            <p>Total notifications:  {props.data.ingredient.hazard.total_notifications} </p>
            <p>Sourse: <a
                href={"https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/"+props.data.ingredient.hazard.cl_inventory_id}>European
                Chemicals Agency (ECHA)</a></p>
        </div>


    )

};

export default IngredientHazard