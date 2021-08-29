import React from 'react';
import { Bar } from 'react-chartjs-2';

const getState = (props) => {
    let descriptions = []
    let num_of_ingredients = []
    const hazard = props.detail_hazard_product

    hazard.map(item => {
        descriptions.push(item.description);
        num_of_ingredients.push(item.num_of_ingredients);
    }); 
        
    return ({descriptions, num_of_ingredients});

};


let state = {
    labels: [],
    datasets: [
        {
            label: 'Hazard ingredients with this hazard class',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 1,
            data: []
        }
    ]
};

const options = {
    title: {
        display: true,
        text: 'Hazard ingredients with this hazard class',
        fontSize: 20
    },
    legend: {
        display: true,
        position: 'right'
    }
};

const Chart = (props) => {
    const unpack_data = getState(props.data);
    state.labels = unpack_data.descriptions;
    state.datasets[0].data = unpack_data.num_of_ingredients;

    return (
        <div>
            <Bar
                data={state}
                options={options}
            />
        </div>
    );
};

export default Chart