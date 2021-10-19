import React,{useEffect, useState} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}))
//TODO отрисовать изображение
const ProductPhoto = (props) => {
    const [image, setImage] = useState()
    const byteImg = props.image
    {/*
        <CardMedia
            component='img'
            src={URL.createObjectURL(props.image)}
        />
    */}

    return (
        <div>

        </div>
    )
};

export default ProductPhoto;