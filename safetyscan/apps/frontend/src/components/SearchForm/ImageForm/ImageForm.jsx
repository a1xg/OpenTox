import React from "react";
import CSRFToken from '../../csrftoken';
import { useState } from "react";
import style from '../../style.module.css';


const ImageForm = (props) => {
    // определяем пустое значение запроса и функцию получения запроса
    const setSearchResults = props.setSearchResults
    
    // обрабатываем событие изменения
    const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        
        fetch('api/image_field', {method: 'POST', body: formData})
        .then(response => {return response.json();})
        .then((data) => {
            setSearchResults({
                data: data, 
                found: true
            });
        });
    }

    return (   
        <form onChange={submitForm}>
            <CSRFToken />       
            <input type="file" value={undefined} />    
        </form>
    )
};

export default ImageForm