import React, { useEffect, useState } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Gallery from "react-grid-gallery";
import Container from '@material-ui/core/Container';

//Todo параметры thumbnailHeight thumbnailWidth необходимы и их надо вычислить

const getPreviewSize = (imgSrc) => {
    let img = new Image;
    img.src = imgSrc;
    img.onload = () => {
        console.log('DIMENSIONS', img.width, img.height);
    };

};

const useStyles = makeStyles((theme) => ({
}));

const ProductPhoto = (props) => {
    const [image, setImage] = useState([{
        src: "https://opentox.s3.eu-central-1.amazonaws.com/scan.png",
        thumbnail: "https://opentox.s3.eu-central-1.amazonaws.com/scan.png",
        caption: "Product image",
        thumbnailWidth: 100,
        thumbnailHeight: 100,
    }]);

    useEffect(() => {
        const base64string = `data:image/jpeg;base64,${props.image.slice(2, -1)}`;
        setImage([
            {
                src: base64string,
                thumbnail: base64string,
                caption: "Product image",
                thumbnailWidth: 100,
                thumbnailHeight: 100,
            }
        ]);
        getPreviewSize(base64string);
    }, [props.image]);

    return (
        <Container styles={{ maxWidth: 100, maxHeigth: 200 }}>
            <Gallery
                images={image}
                enableLightbox={true}
                backdropClosesModal
            />
        </Container>
    )
};

export default ProductPhoto;