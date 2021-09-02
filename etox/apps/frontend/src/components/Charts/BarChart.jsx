import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    const data = {
        labels: ['','','','','','','',''], // props.labels
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
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display:false,
                position: 'left',
            },
            title: {
                display: true,
                text: 'Hazard scale for each class',
            },
        },
    };

    return (
            <div>
                <Bar data={data} options={options} />
            </div>
    );
};

export default BarChart;