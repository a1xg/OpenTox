import React, { useEffect, useState } from "react";
import { Box, Tooltip, makeStyles } from "@material-ui/core";
import { chartColorMap } from './ChartsConfig';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'inline-flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        backgroundColor: theme.palette.grey[50],
        border: `1px solid ${theme.palette.grey[300]}`, 
        borderRadius: '11px',
    },
    item: {

        backgroundColor: theme.palette.grey[50]
    }

}))

const BriefStatistics = (props) => {
    const [data, setData] = useState([{ color: '', description: '', hazard_class: '', id: null }]);
    const classes = useStyles();
    useEffect(() => {
        props.data.map(item => {
            item.color = chartColorMap[item.hazard_class]
        });
        setData(props.data);
    }, [props]);

    return (
        data.length > 0 &&
        <Box className={classes.wrapper}
            sx={{
                height: props.height,
                paddingTop: props.padding,
                paddingBottom: props.padding,
                paddingLeft: props.padding / 2,
                paddingRight: props.padding / 2,
            }}
        >
            {data.map(item => {
                return (
                    <Tooltip title={item.description} key={item.color}>
                        <Box
                            className={classes.item}
                            sx={{
                                borderRadius: props.padding,
                                marginRight: props.padding / 2,
                                marginLeft: props.padding / 2,
                                width: props.height,
                                height: props.height,
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