import React from 'react';
import Typography from "@material-ui/core/Typography";

const DescriptionDesctop = (props) => {
    return (
        <Typography variant='body1'>
            {props.data}
        </Typography>
    )
};

export default DescriptionDesctop;

