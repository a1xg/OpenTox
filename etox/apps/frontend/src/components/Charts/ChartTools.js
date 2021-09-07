import React from 'react';


const getColors = (props) => {
    let backgroundColors = [];
    let borderColors = [];
    const step  = Math.floor(256/props.numberOfColors);

    for (let i = 0; i < props.numberOfColors; i++) {

        let red = Math.floor(Math.random()*step)*props.numberOfColors;
        let green = Math.floor(Math.random()*step)*props.numberOfColors;
        let blue = Math.floor(Math.random()*step)*props.numberOfColors;
        backgroundColors.push(`rgba(${red}, ${green}, ${blue}, ${props.backgroundClarity} )`);
        borderColors.push(`rgba(${red}, ${green}, ${blue}, ${props.borderClarity} )`);
    };
    
    return { backgroundColors, borderColors }
};

const dictsToArrays = (props) => {
    let arrays = {};
    Object.keys(props[0]).forEach(key => {
    arrays[key] = props.map(item => item[key]);
    });
    return arrays;
}

export { getColors, dictsToArrays };