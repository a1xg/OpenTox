import React, { useEffect, useState } from "react";
import { Box, Tooltip } from "@material-ui/core";
import { chartColorMap } from '../../../../Charts/ChartsConfig';
//TODO не выводить никаких заглушек, если данных по опасности нет.
const BriefStatistics = (props) => {
    const [data, setData] = useState([{ color: '', description: '', hazard_class: '', id: null }]);
    useEffect(() => {
        props.data.map(item => {
            item.color = chartColorMap[item.hazard_class]
        });
        setData(props.data);
    }, [props]);

    return (
        <Box sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            height: props.height, 
            backgroundColor: '#FFFFFF',
            border: '1px solid lightgray',
            borderRadius: '11px',
            paddingTop: props.padding,
            paddingBottom:props.padding,
            paddingLeft:props.padding/2,
            paddingRight:props.padding/2,
        }}
        >
            {data.map(item => {
                return (
                    <Tooltip title={item.description} key={item.color}>
                        <Box sx={{
                            opacity: '0.8',
                            borderRadius: props.padding,
                            marginRight: props.padding/2,
                            marginLeft: props.padding/2,
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