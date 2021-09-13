import React from 'react';
import { Bar } from 'react-chartjs-2';
// !TODO предусмотреть отсутствие данных для отображения и вывести заглушку
// !TODO переписать рейтинг на https://js.devexpress.com/ или https://nivo.rocks/pie/ 

const BarChart = (props) => {
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
            //legend: {
            //    display:false,
            //    position: 'left',
            //},
            legend:false,
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