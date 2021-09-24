import React from 'react';
import { CardMedia, makeStyles } from '@material-ui/core';
import ItemCard from '../../../ItemCard/ItemCard.jsx';

const useStyles = makeStyles((theme) => ({
}))

const ProductPhoto = (props) => {
    return (
        <CardMedia
            component='img'
            src='https://img.wonderhowto.com/img/68/22/63430545609681/0/your-typical-beauty-product-ingredients-list.w1456.jpg'
            title="Contemplative Reptile"
        />
    )
};

export default ProductPhoto;