import React, { useEffect, useRef } from "react";
import { Bar } from 'react-chartjs-2';
import style from './Charts.module.css';
// !TODO предусмотреть отсутствие данных для отображения и вывести заглушку
const HazardBar = (props) => {
    const width = props.width;
    const height = props.height;

    const getRedOrGreenColor = (props) => {
        const red = Math.floor(255 * props.rating / 10);
        const green = Math.floor(255 - red);
        return `rgba(${red}, ${green}, 0, 1)`;
    };

    const getData = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 1)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');   // getRedOrGreenColor(props)

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
                display: true,
                text: props.title,
            },
        },
};

return (<div className={style['hazard-bar']}>
        <Bar data={getData} options={options} />
        </div>
);
};

export default HazardBar;
