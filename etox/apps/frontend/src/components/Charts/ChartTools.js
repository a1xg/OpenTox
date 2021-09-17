const dictsToArrays = (props) => {
    let arrays = {};
    Object.keys(props[0]).forEach(key => {
    arrays[key] = props.map(item => item[key]);
    });
    return arrays;
};

// for nivo chart doughnut
const getData = (props) => {
    console.log('getData props', props)
    let data = []
    props.dataset.map(item => {
        data.push({
            id:item[props.id],
            label:item[props.label], 
            value:item[props.value],
        })
    });
    return data;
};


const getBarData = (props) => {
    let data = [];
    props.dataset.map(item => {
        let label = item[props.label]
        let key = item[props.id]
        let val = item[props.value]
        data.push({ [key] : val, label: label });
    });
    return data;
};

export { dictsToArrays, getData, getBarData };

