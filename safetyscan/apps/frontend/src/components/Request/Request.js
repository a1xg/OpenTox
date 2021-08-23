import React, { useState } from "react";


const Request = (props) => {
    console.log('request props:', props)
    const setSearchResults = props.setSearchResults
    
    const getResult = () => {
        fetch(props.url, props.options)
        .then(response => {return response.json();})
        .then((data) => {
            console.log(data);
          setSearchResults({
            data: data, 
            found: true
          });
        });
      }
    
    getResult();
}

export default Request;