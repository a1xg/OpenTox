import React,{useState, useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import {capitalize} from "@material-ui/core";

const Title = (props) => {
    console.log('Title props', props);
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        if (props.mainName != null) {
            setTitle(capitalize(props.mainName.toLowerCase()));
        }
    },[props]);

    return (
        <Typography variant='h5'>
            {title}
        </Typography>
    )

};

export default Title;