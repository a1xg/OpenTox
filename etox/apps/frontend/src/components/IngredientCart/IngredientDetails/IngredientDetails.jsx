import React from 'react';

const IngredientDetails = (props) => {
    const ingredient = props.data.ingredient;
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Identifier</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CAS Numbers:</td>
                        <td>
                            {ingredient.cas_numbers?.join(', ')}
                        </td>
                    </tr>
                    <tr>
                        <td>EC Numbers:</td>
                        <td>
                            {ingredient.ec_numbers?.join(', ')}
                        </td>
                    </tr>
                    <tr>
                        <td>E Number:</td>
                        <td>{ingredient.e_number}</td>
                    </tr>
                    <tr>
                        <td>Functions:</td>
                        <td>
                            {ingredient.functions?.join(', ')}
                        </td>
                    </tr> 
                    <tr>
                        <td>Colour Index number:</td>
                        <td> 
                            {ingredient.colour_index?.join(', ')
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