import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    const data = {
        labels: props.labels, // props.labels
        datasets: [
            {
                data: props.data,
                backgroundColor: props.backgroundColors,
                borderColor: props.borderColors,
                borderWidth: 1,
            },
        ],
    };
    // !TODO предусмотреть отключение labels вместо того, что бы пихать в них пучтые строки.
    const options = {
        scales: {
            x: {
                suggestedMin: 0,
                suggestedMax: 10
            }
        },
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
                text: props.title,
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