import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box'
import Typography from "@material-ui/core/Typography";
import { capitalize } from "@material-ui/core";

const Title = (props) => {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (props.mainName != null) {
            setTitle(capitalize(props.mainName.toLowerCase()));
        }
    }, [props]);

    return (
        <Box>
            <Typography variant='caption'>
                Ingredient name
            </Typography>
            <Typography variant='h5'>
                {title}
            </Typography>
        </Box>
    )

};

export default Title;