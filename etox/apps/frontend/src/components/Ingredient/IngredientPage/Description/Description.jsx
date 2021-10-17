import React from 'react';
import Typography from "@material-ui/core/Typography";

const Description = (props) => {
    return (
        <Typography variant='body1'>
            {props.data}
        </Typography>
    )
};

export default Description;

