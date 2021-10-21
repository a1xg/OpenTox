import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Divider from '@mui/material/Divider';
import useStyles from './styles.js';
import LegendHorizontal from '../../../Charts/LegendHorizontal/LegendHorizontal.jsx'

const echaURL = 'https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/'

const ChartDescription = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Grid container direction="column" spacing={1}>
                {props.data.hazard_ghs_set.length > 0 &&
                    <LegendHorizontal data={props.data.hazard_ghs_set} />
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

export default ChartDescription;