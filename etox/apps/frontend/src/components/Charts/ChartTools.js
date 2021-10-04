import { chartColorMap } from './ChartsConfig'

const getData = (props) => {
    console.log('getData props', props)
    let data = []
    props.dataset.map((item,i) => {
        if (props.notAvailableIgnore == true) {
            if (item.hazard_class != 'NO_DATA_AVAILABLE') {
                data.push({
                    id: item[props.key],
                    label: item[props.label], 
                    value: item[props.value],
                    color: chartColorMap[item[props.key]],
                    index:i
                });
            }
        } else {
            data.push({
                id: item[props.key],
                label: item[props.label], 
                value: item[props.value],
                color: chartColorMap[item[props.key]],
                index: i
                
            });
        };
    });
    return data;
};

export { getData };