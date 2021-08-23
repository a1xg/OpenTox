 import React, { useState } from "react";
import CSRFToken from '../csrftoken';
import Request from '../Request/Request';

const ImageForm = (props) => {
    // определяем пустое значение запроса и функцию получения запроса
    const setSearchResults = props.setSearchResults
    
    // обрабатываем событие изменения
    const handleChange = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', event.target.files[0])

        let options = {
            method: 'POST',
            body: formData
          };

        Request({
            url:'api/image_field', 
            options,
            setSearchResults
        });
    }

    
    return (    
        <form onChange={handleChange}>
            <CSRFToken />       
            <input type="file" />    
        </form>
    )
}

export default ImageForm;


            /*
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'multipart/form-data'},
                image: selectedImage
              };

            Request({ 
                url:'api/image_field',
                options,
                setSearchResults 
            });
            */