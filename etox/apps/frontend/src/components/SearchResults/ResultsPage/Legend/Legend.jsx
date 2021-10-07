import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
 
}));

const Legend = (props) => {
    console.log('Legend props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data)

    }, [props]);

    return (
        legendData.length > 0 &&
        <List>
            {legendData.map(item => {
                return (
                    <ListItem key={item.id}>
                        <ListItemIcon>
                            <svg width='30' height='14' >
                                <rect x="0" y="0" width="30" height="14" rx="7" fill={item.color} />
                            </svg>
                        </ListItemIcon>
                        <ListItemText secondary={item.label} />
                    </ListItem>
                )
            })}
        </List>
    )
};

export default Legend;