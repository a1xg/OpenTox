import jQuery from "jquery";
import React from 'react';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={getCookie('csrftoken')} />
    );
};

export default CSRFToken;
