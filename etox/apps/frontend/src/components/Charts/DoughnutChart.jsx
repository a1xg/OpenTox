import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// !TODO предусмотреть отсутствие данных для отображения и вывести заглушку
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
                position: 'right',
            },
            title: {
                display: true,
                text: props.title
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