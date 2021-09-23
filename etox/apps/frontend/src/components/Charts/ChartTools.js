import { chartColorMap } from './ChartsConfig'

const getData = (props) => {
    console.log('getData props', props)
    let data = []
    props.dataset.map(item => {
        if (props.notAvailableIgnore == true) {
            if (item.hazard_class != 'NO_DATA_AVAILABLE') {
                data.push({
                    id: item[props.key],
                    label: item[props.label], 
                    value: item[props.value],
                    color: chartColorMap[item[props.key]]
                });
            }
        } else {
            data.push({
                id: item[props.key],
                label: item[props.label], 
                value: item[props.value],
                color: chartColorMap[item[props.key]]
            });
        };
    });
    return data;
};

export { getData };