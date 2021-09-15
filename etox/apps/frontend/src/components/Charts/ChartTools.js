
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
};

/**
 * @param {Array} data
 * - Accepts an array of dictionaries like:
 *  [{key1:val, key2:val},{key1:val, key2:val}]
 * @param {string} backgroundClarity
 * - color transparency of backgroung values: string('0.1'...'1')
 * @param {string} borderClarity
 * - color transparency of border values: string('0.1'...'1')
 * @returns 
 * @param {dict} chartData.datasets
 * - dict of arrays like: {key1:[val, val], key2:[val, val]}
 * @param {Array} chartData.colors.backgroundColors
 * - array of random RGB codes for background
 * @param {Array} chartData.colors.borderColors
 * - array of random RGB codes for border
 */ 
const getChartData = (props) => {
    const chartData = {
        colors: getColors({
            numberOfColors: props.data.length,
            backgroundClarity: props.backgroundClarity,
            borderClarity: props.borderClarity
        }),
        datasets:dictsToArrays(props.data),
    }
    return chartData;
};

// TODO написать метод подготовки данных под чарты Nivo
/*
Образец датасета: 
{
        "id": "ASPIRATION_TOXICITY",
        "label": "ASPIRATION_TOXICITY",
        "value": 402,

    },
*/

const getData = (props) => {
    let data = []
    props.dataset.map(item => {
        data.push({
            "id":item[props.id],
            "label":item[props.label], 
            "value":item[props.value],
        })
    });

    return data;
};













export { getChartData, getData };
