import React, { useEffect, useState } from "react";
import { Box, Tooltip } from "@material-ui/core";
import { chartColorMap } from '../../../../Charts/ChartsConfig';

const BriefStatistics = (props) => {
    //console.log('BriefStatistics props', props);
    const [data, setData] = useState([{ color: '', description: '', hazard_class: '', id: null }]);
    useEffect(() => {
        props.data.map(item => {
            item.color = chartColorMap[item.hazard_class]
        });
        setData(props.data);
    }, [props]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            border: '1px solid lightgray',
            borderRadius: '11px',
            padding: '3px',
            width: props.width,
            height: props.height
        }}
        >
            {data.map(item => {
                return (
                    <Tooltip title={item.description} key={item.color}>
                        <Box sx={{
                            opacity: '0.8',
                            borderRadius: '2px',
                            width: props.height,
                            height: props.height,
                            backgroundColor: '#FFFFFF',
                        }}
                        >
                            <svg width={props.height} height={props.height} >
                                <circle cx={props.height / 2} cy={props.height / 2} r={props.height / 2} fill={item.color} />
                            </svg>
                        </Box>
                    </Tooltip>
                )
            })}
        </Box>
    )
};

export default BriefStatistics;