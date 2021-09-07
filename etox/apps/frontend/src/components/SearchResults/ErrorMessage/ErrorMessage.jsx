import React from 'react';
import style from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
    return (
        <div>
            <p className={style['error-message']}>Sorry, ingredients not found...</p>
        </div>
    )
};

export default ErrorMessage