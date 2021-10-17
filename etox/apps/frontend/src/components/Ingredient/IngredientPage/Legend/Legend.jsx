import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import { getData } from '../../../Charts/ChartTools';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';

const echaURL = 'https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: theme.spacing(1),
    },
    grid:{
        margin:5,
    },
    gridItem: {
        //border: `1px solid ${theme.palette.grey[400]}`,
        borderRadius: 4,
        backgroundColor: theme.palette.grey[100],
        height: '100%',
    },
    stack: {
        alignItems: 'center',
        textAlign: 'left',
    },
    stackWrapper:{
        padding: 5
    }

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
            <Grid container direction="column" spacing={1}>
                {legendData.length > 0 &&
                    <Grid item xs={12} container direction='row' spacing={1} className={classes.grid}>
                        {legendData.map(item => {
                            return (
                                <Grid item xs={3} key={item.id}>
                                    <Paper className={classes.gridItem} elevation={3}>
                                        <Box className={classes.stackWrapper}>
                                        <Stack direction='column' className={classes.stack}>
                                            <svg width='100%' height='4' >
                                                <rect
                                                    fill={item.color}
                                                    x='0'
                                                    y='0'
                                                    width="100%"
                                                    height='4'
                                                    rx='2'
                                                    
                                                />
                                            </svg>
                                            <Typography variant='caption' style={{margin:5}}> {item.label} </Typography>
                                        </Stack>
                                        </Box>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                }      
                <Grid item xs={12} >
                    <Divider />
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
                                Source: <Link href={`${echaURL}${props.data.cl_inventory_id}`} >
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