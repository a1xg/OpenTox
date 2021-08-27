import React from 'react';

const IngredientDetails = (props) => {
    const ingredient = props.data.ingredient;
    return (
        <div className="alert alert-warning">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Identifier</th>
                        <th scope="col">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CAS Numbers:</td>
                        <td>
                            {ingredient.cas_numbers.map(cas => {
                                return (
                                    <p>{cas}, </p>
                                )
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>EC Numbers:</td>
                        <td>
                            {ingredient.ec_numbers?.map(ec_num => {
                                return (
                                    <p>{ec_num}, </p>
                                )
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td>E Number:</td>
                        <td>{ingredient.e_number}</td>
                    </tr>
                    <tr>
                        <td>Functions:</td>
                        <td>
                            {ingredient.functions?.map(func => {
                                return (
                                    <p>{func}, </p>
                                )
                            })}
                        </td>
                    </tr> 
                    <tr>
                        <td>Colour Index number:</td>
                        <td> 
                            {ingredient.colour_index?.map(ci => {
                                    return (
                                        <p>{ci}, </p>
                                    )
                                })
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Pubchem CID:</td>
                        <td>
                            <a href={"https://pubchem.ncbi.nlm.nih.gov/compound/"+ingredient.pubchem_cid}>{ingredient.pubchem_cid}</a>
                        </td>
                    </tr> 
                </tbody>
            </table>
        </div>
    )

};

export default IngredientDetails