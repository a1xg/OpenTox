import React, {useEffect, useState} from 'react';
import useStyles from './styles.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Stack } from '@mui/material';
import { getData } from '../ChartTools.js';

const LegendHorizontal = (props) => {
    console.log('LegendHorizontal props', props);
    const [legendData, setLegendData] = useState([{ value: null, id: null, label: null, color: 'white' }]);
    const classes = useStyles();

    useEffect(() => {
        const data = getData({
            dataset: props.data,
            key: 'hazard_class',
            value: 'hazard_scale_score',
            label: 'description',
        });
        setLegendData(data);
    }, [props]);

    return (
        <Grid item container 
        xs={12} 
        direction='row' 
        spacing={1} 
        className={classes.grid}
        >
            {legendData.map(item => {
                return (
                    <Grid item xs={3} key={item.id}>
                        <Paper className={classes.gridItem} elevation={3}>
                            <Box className={classes.stackWrapper}>
                                <Stack 
                                direction='column' 
                                className={classes.stack}
                                >
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
                                    <Typography 
                                    variant='caption' 
                                    style={{ margin: 5 }}
                                    > 
                                    {item.label} 
                                    </Typography>
                                </Stack>
                            </Box>
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    )
};

export default LegendHorizontal;