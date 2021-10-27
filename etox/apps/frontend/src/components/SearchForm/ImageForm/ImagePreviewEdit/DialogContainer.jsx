import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import ImagePreview from './ImagePreview.jsx';
import ImageEditor from './ImageEditor.jsx';
import ItemCard from '../../../ItemCard/ItemCard.jsx';
import useStyles from './styles.js';
import { MobileOrDesctop, base64decode } from '../../../tools.js';
 
const UploadDialog = (props) => {
    const classes = useStyles();
    const [editPreviewSwitch, setEditPreviewSwitch] = useState(false);
    const [base64Image, setBase64Image] = useState(null);
    const displayOption = MobileOrDesctop();

    const sendHandler = () => {
        const imageFile = base64decode(base64Image);
        props.setFinalImage(imageFile);
    };

    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(props.inputImage);
        reader.onloadend = () => {
            setBase64Image(reader.result);
        };
    }, [props.inputImage]);

    return (
        <Dialog
            open={props.openDialog}
            onClose={props.closeHandler}
            className={classes.dialog}
            fullWidth={displayOption == 'mobile' ? true : false}
        >
            {editPreviewSwitch == false &&
                <ItemCard title='Preview'>
                    <Container className={classes.dialogContainer}>
                        <ImagePreview
                            base64Image={base64Image}
                            setEditPreviewSwitch={setEditPreviewSwitch}
                            sendHandler={sendHandler}
                        />
                    </Container>
                </ItemCard>
            }
            {editPreviewSwitch == true &&
                <ItemCard title='Editor'>
                    <Container className={classes.dialogContainer}>
                        <ImageEditor
                            base64Image={base64Image}
                            setEditPreviewSwitch={setEditPreviewSwitch}
                            setBase64Image={setBase64Image}
                            setCropParam={props.setCropParam}
                        />
                    </Container>
                </ItemCard>
            }

        </Dialog>
    )
};

export default UploadDialog;