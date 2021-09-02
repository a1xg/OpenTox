import React from 'react';
import style from '../../style.module.css'

const ErrorMessage = (props) => {
    return (
        <div className={style['container']}>
            <p className={style['error-message']}>Sorry, ingredients not found...</p>
        </div>
    )
};

export default ErrorMessage