import React from "react";
import style from './SearchForm.module.css';
import ImageForm from "./ImageForm/ImageForm.jsx";
import TextForm from "./TextForm/TextForm.jsx";


const SearchForm = (props) => {
    return (
        <div> 
            <ImageForm setQuery={props.setQuery} />
            <TextForm setQuery={props.setQuery} />
        </div>
    )
};

export default SearchForm