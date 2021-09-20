import { colorMap } from './ChartsConfig'

const getData = (props) => {
    //console.log('getData props', props)
    let data = []
    props.dataset.map(item => {
        data.push({
            id: item[props.id],
            label: item[props.label], 
            value: item[props.value],
            color: colorMap[item[props.id]]
        });
    });
    return data;
};

export { getData };