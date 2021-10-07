import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Divider, Link, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(1),
    },
}));

const Legend = (props) => {
    console.log('Legend props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();

    useEffect(() => {
        const data = getData({
            dataset: props.data.hazard_ghs_set,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data);
    }, [props]);

    return (
        <Box className={classes.wrapper}>
            <Grid container direction="column" >
                {legendData.length > 0 &&
                    <Grid item xs={12} container direction='row' spacing={1}>
                        {legendData.map(item => {
                            return (
                                <Grid item xs={4} key={item.id}>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <svg width='30' height='14' >
                                                    <rect x="0" y="0" width="30" height="14" rx="7" fill={item.color} />
                                                </svg>
                                            </ListItemIcon>
                                            <ListItemText secondary={item.label} />
                                        </ListItem>
                                    </List>
                                </Grid>
                            )
                        })}
                    </Grid>
                }
                <Grid item xs={12} >
                    <Divider></Divider>
                    {props.data.total_notifications != null &&
                    <Box sx={{paddingTop:'10px'}}>
                        <Typography variant='subtitle2'>
                            Total notifications: {
                                props.data.total_notifications
                            }
                        </Typography>
                    </Box>
                    }
                    {props.data.cl_inventory_id != null &&
                    <Box sx={{paddingTop:'10px'}}>
                        <Typography variant='subtitle2'>
                            Source: <Link href={
                                "https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/"
                                + props.data.cl_inventory_id
                            } underline='hover'
                            >
                                 {props.data.sourse}
                            </Link>
                        </Typography>
                    </Box>
                    }

                </Grid>
            </Grid>
        </Box>
    )
};

export default Legend;