import React, { useEffect, useRef } from "react";
import { Bar } from 'react-chartjs-2';

const HazardBar = (props) => {
    const width = props.width;
    const height = props.height;

    const getRedOrGreenColor = (props) => {
        const red = Math.floor(255 * props.rating/10);
        const green = Math.floor(255 - red);
        return `rgba(${red}, ${green}, 0, 1)`;
    };

    const data = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');   // getRedOrGreenColor(props)
        
        return {
            labels: [''],
            datasets: [
                {
                    backgroundColor : gradient,
                    borderColor : 'rgba(0, 255, 0, 1)',
                    borderWidth: 1,
                    data : [props.rating]
                }
            ]
        }
    };

    const options = {
        indexAxis: 'y',
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: false,
                    max: 10,
                    min: 0
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    max: 10,
                    min: 0
                }
            }]
        },
        responsive: true,
        plugins: {
            legend: {
                display:false,
                position: 'left',
            },
            title: {
                display: true,
                text: `${props.title} ${props.rating}`,
            },
        },
    };
    
    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default HazardBar;
