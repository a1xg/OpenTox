import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                backgroundColor: props.backgroundColors,
                borderColor: props.borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Quantity of components with hazard class'
            }
        }
    };

    return (
            <div>
                <Doughnut data={data} options={options}/>
            </div>
    );
};

export default DoughnutChart;