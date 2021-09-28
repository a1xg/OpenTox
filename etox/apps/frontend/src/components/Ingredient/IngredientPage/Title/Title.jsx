import React from 'react';
import { Typography } from "@material-ui/core";

const Title = (props) => {
    const title = props.data.ingredient.main_name;
    return (
            <Typography variant='h5'>{props.data.ingredient.main_name}</Typography>
    )

};

export default Title;