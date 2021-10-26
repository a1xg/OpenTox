import React, { useEffect, useState } from 'react';
import Gallery from "react-grid-gallery";
import Container from '@material-ui/core/Container';
import { getPreviewSize } from '../../../tools.js'
import useStyles from './styles.js';

const ProductPhoto = (props) => {
    const classes = useStyles();
    const [image, setImage] = useState();

    useEffect(() => {
        const newSize = getPreviewSize({
            height: props.image.height,
            width: props.image.width,
            maxResolution: 300
        });

        const base64string = `data:image/jpeg;base64,${props.image.image}`;
        setImage([
            {
                src: base64string,
                thumbnail: base64string,
                caption: "Product image",
                thumbnailWidth: newSize.width,
                thumbnailHeight: newSize.height,
            }
        ]);

    }, [props.image.image]);

    return (
        <Container className={classes.container}>
            {image != null &&
                <Gallery
                    images={image}
                    enableLightbox={true}
                    backdropClosesModal
                />
            }
        </Container>
    )
};

export default ProductPhoto;