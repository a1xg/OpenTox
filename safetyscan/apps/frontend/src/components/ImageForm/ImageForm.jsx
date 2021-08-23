import React from "react";
import CSRFToken from '../csrftoken';
import Request from '../Request/Request';

const ImageForm = (props) => {
    // определяем пустое значение запроса и функцию получения запроса
    const setSearchResults = props.setSearchResults
    
    // обрабатываем событие изменения
    const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', event.target.files[0])
        
        Request({
            url:'api/image_field', 
            options:{method: 'POST', body: formData},
            setSearchResults});
    }


    return (    
        <form onChange={submitForm}>
            <CSRFToken />       
            <input type="file" />    
        </form>
    )
}

export default ImageForm