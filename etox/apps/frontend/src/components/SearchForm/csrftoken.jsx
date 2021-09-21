import jQuery from "jquery";
import React, { useState, useEffect } from 'react';

const CSRFToken = (name) => {
    const [csrfToken, setToken] = useState(undefined)
    useEffect(() => {
        let token = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    token = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        };
        setToken(token)
    }, [document.cookie])

    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
    );
};

export default CSRFToken;
