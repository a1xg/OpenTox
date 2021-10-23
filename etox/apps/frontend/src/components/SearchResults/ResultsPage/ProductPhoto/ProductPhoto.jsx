import React,{useEffect, useState} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}))

const ProductPhoto = (props) => {
    console.log('ProductPhoto props', props.image)
    const [image, setImage] = useState()
    useEffect(() => {
        const base64string = `data:image/jpeg;base64,${props.image.slice(2,-1)}`
        setImage(base64string)
    }, [props.image])
 
    return (
        <CardMedia
            component='img'
            src={image}
        />
    )
};

export default ProductPhoto;