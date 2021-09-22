import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = [

    {
        id: "cost",
        ranges: [3.5,6.5,10],
        measures: [0],
        markers: [8]
    }
];

// !TODO перенести рейтинг бары на nivo или SVG
const RatingBar = (props) => {
    const width = props.width;
    const height = props.height;

    const getData = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

        return {
            labels: [''],
            datasets: [
                {
                    backgroundColor: gradient,
                    borderColor: 'rgba(0, 255, 0, 0.6)',
                    borderWidth: 1,
                    data: [props.rating]
                }
            ]
        }
    };

    const options = {
        scales: {
            x: {
                suggestedMin: 0,
                suggestedMax: 10
            }
        },
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'left',
            },
            title: {
                display: false,
                text: props.title,
            },
        },
    };

    return (
        <div style={{ widht: "100px", height: "20px" }}>
            <Bar data={getData} options={options} />
        </div>
    );
};

export default RatingBar;
