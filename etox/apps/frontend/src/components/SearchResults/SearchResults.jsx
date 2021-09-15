import React, { useState, useEffect } from "react";
import { PassChartData } from "../PassData";
import { getChartData, getData } from '../Charts/ChartTools';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import ResultsPage from './ResultsPage/ResultsPage.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

const SearchResults = (props) => {
    console.log('SearchResults props:', props);
    const [chartData, setChartData] = useState(PassChartData);
    const [d, setD] = useState([{'value':null, 'label':null, 'id': null}])
    const [c, setC] = useState([{'value':null, 'label':null, 'id': null}])
    useEffect(() => {
        if (props.searchResults.loaded == true) {
            if (props.searchResults.data.detail_hazard_product.length > 0) {
                const data = getChartData({
                    data: props.searchResults.data.detail_hazard_product,
                    backgroundClarity: '0.4',
                    borderClarity: '1'
                });
                setChartData(data);
                // for nivo charts
                const d = getData({
                    dataset: props.searchResults.data.detail_hazard_product, 
                    label:'description',
                    id:'hazard_class',
                    value:'num_of_ingredients'
                });
                setD(d);
                const c = getData({
                    dataset: props.searchResults.data.detail_hazard_product, 
                    label:'description',
                    id:'hazard_class',
                    value:'hazard_scale_score'
                });
                setC(c);
            }
        };
    }, []);

    if (props.searchResults.loaded == true) {
        return (
            <ResultsPage
                searchResults={props.searchResults}
                chartData={chartData}
                d={d}
                c={c}
            />
        )

    } else if (props.searchResults.loaded == false) {
        return (<LinearProgress />)
    } else { return (<ErrorMessage />) }
};

export default SearchResults;