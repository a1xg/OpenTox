import React, { useRef } from "react";
import CSRFToken from '../../csrftoken';
import style from '../../style.module.css';
import { useHistory } from "react-router-dom";

const TextForm = (props) => {
    const form = useRef(null);
    const history = useHistory();

    const submitForm = (event) => {
        event.preventDefault();
        const data = new FormData(form.current);

        props.request({
            url: 'api/text_field',
            options: { method: 'POST', body: data }
        });

        history.push('/search-results');
    }

    return (
        <div className="row">
            <div className="col-lg-12 card-margin">
                <div className={[style['card'], style['search-form']].join(' ')}>
                    <div className="card-body p-0">
                        <form onSubmit={submitForm} ref={form} id="search-form">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row no-gutters">
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                        </div>
                                        <div className="col-lg-8 col-md-6 col-sm-12 p-0">

                                            <CSRFToken />
                                            <input
                                                type="text"
                                                name="text"
                                                placeholder="Enter ingredients separated by commas"
                                                className="form-control"
                                                id="search"
                                                value={undefined}
                                                maxLength="2000"
                                            />

                                        </div>
                                        <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                                            <button type="submit" className="btn btn-base">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    className="feather feather-search">
                                                    <circle cx="11" cy="11" r="8"></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TextForm