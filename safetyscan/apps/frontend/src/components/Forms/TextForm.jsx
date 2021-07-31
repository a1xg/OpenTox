import React from 'react';
import CSRFToken from '../csrftoken';
import s from '../style.module.css';

const TextForm = (props) => {
    return (
        <div className="row">
            <div className="col-lg-12 card-margin">
                <div className={[s['card'], s['search-form']].join(' ')}>
                    <div className="card-body p-0">
                        <form method="post" action="api/test" id="search-form">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row no-gutters">
                                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                        </div>
                                        <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                                            <CSRFToken />
                                            <input type="text" name="text" placeholder="Enter ingredients separated by commas" className="form-control" id="search" maxLength="2000" />
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

export default TextForm;