import React from "react";
import style from '../style.module.css';
import ImageForm from "./ImageForm/ImageForm.jsx";
import TextForm from "./TextForm/TextForm.jsx";

const SearchForm = (props) => {
    return (
        <div className={style['searchform']}>
            <ImageForm setSearchResults={props.setSearchResults} />
            <TextForm setSearchResults={props.setSearchResults} />
        </div>
    )
};

export default SearchForm