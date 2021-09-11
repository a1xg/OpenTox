import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';

const Synonyms = (props) => {
    console.log('Synonyms props:', props)
    const getData = () => {
        if (props.data.ingredient.synonyms) {
            return props.data.ingredient.synonyms.eng.join(', ')    
        } else {
            return (<p>Not data</p>)
        }
    }

    return (
        <div>
            <p>Synonyms:</p>
            {getData()}
        </div>
    )

};

export default Synonyms;