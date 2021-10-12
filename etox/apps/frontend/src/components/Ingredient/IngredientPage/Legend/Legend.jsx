import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Link, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import { textAlign } from '@mui/system';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: theme.spacing(1),
    },
}));
// TODO перевести легенду на элементы Stack
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
                    <Grid item xs={12} container direction='row' spacing={3}>
                        {legendData.map(item => {
                            return (
                                <Grid item xs={3} key={item.id}>
                                    <Stack direction='column' flexItem alignItems='center' textAlign='center'>
                                        <svg width='100%' height='10' >
                                            <rect x="0" y="0" width="100%" height="4" rx="2" fill={item.color} />
                                        </svg>

                                        <Typography variant='caption'> {item.label} </Typography>
                                    </Stack>
                                </Grid>
                            )
                        })}
                    </Grid>
                }
                <Grid item xs={12} >
                    <Divider></Divider>
                    {props.data.total_notifications != null &&
                        <Box sx={{ paddingTop: '10px' }}>
                            <Typography variant='subtitle2'>
                                Total notifications: {
                                    props.data.total_notifications
                                }
                            </Typography>
                        </Box>
                    }
                    {props.data.cl_inventory_id != null &&
                        <Box sx={{ paddingTop: '10px' }}>
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