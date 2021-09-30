import React,{useState, useEffect} from 'react';
import { Typography } from "@material-ui/core";

const Title = (props) => {
    console.log('Title props', props);
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        if (props.mainName != null) {
            const name = props.mainName[0] + props.mainName.substring(1).toLowerCase()
            setTitle(name);
        }
    },[props]);

    return (
        <Typography variant='h5'>
            {title}
        </Typography>
    )

};

export default Title;