import React from "react";
import style from './SearchForm.module.css';
import ImageForm from "./ImageForm/ImageForm.jsx";
import TextForm from "./TextForm/TextForm.jsx";


const SearchForm = (props) => {
    const setSearchResults = props.setSearchResults;

    const request = (props) => {
        fetch(props.url, props.options)
        .then(response => {return response.json();})
        .then((data) => {
            setSearchResults({data: data, found: true});
        });
    };

    return (
        <div> 
            <ImageForm request={request} />
            <TextForm request={request} />
        </div>
    )
};

export default SearchForm