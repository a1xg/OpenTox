import React from "react";
import CSRFToken from '../../csrftoken';
import { useHistory } from "react-router-dom";
import style from '../../style.module.css';



const ImageForm = (props) => {    
    const history = useHistory();

    const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        
        props.request({
            url:'api/image_field',
            options:{method: 'POST', body: formData}
        });

        history.push('/search-results');
    }

    return (   
        <form onChange={submitForm}>
            <CSRFToken />       
            <input type="file" value={undefined} />    
        </form>
    )
};

export default ImageForm