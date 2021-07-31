import React from 'react';
import CSRFToken from '../csrftoken';

const ImageForm = (props) => {
    return (    
        <form method="post" action="api/test" encType="multipart/form-data" >
            <CSRFToken />       
            <input type="file" name="image" placeholder="Select product photo"></input>                               
        </form>
    )
}

export default ImageForm;