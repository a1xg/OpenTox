import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
    },
    rowItem: {
        padding: theme.spacing(1),
    },
    text: {
        textAlign: 'left'
    },
    svg: {
        alignContent: 'center'
    },
    wrapper: {
        padding: theme.spacing(1),
        alignContent: 'center'
    }
}));

const Legend = (props) => {
    console.log('Legend props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();
    useEffect(() => {
        const data = getData({
            dataset: props.data.detail_hazard_product,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data)

    }, [props]);

    return (
        legendData.length > 0 &&
        <Box className={classes.wrapper}>
            <List>
                {legendData.map(item => {
                    return (
                        <ListItem key={item.id}>
                            <ListItemIcon>
                                <svg width='30' height='14' >
                                    <rect x="0" y="0" width="30" height="14" rx="7" fill={item.color} />
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
};

export default Legend;