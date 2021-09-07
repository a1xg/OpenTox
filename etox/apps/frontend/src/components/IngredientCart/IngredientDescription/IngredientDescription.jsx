import React from 'react';

const IngredientDescription = (props) => {
    return (
        <div>
            Ingredient Description:
            <div>
                {props.data.ingredient.description}
            </div>
        </div>
    )

};

export default IngredientDescription

