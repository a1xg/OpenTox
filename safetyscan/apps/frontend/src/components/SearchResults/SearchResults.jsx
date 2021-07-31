import React from 'react';
import ResultsTable from '../ResultsTable/ResultsTable.jsx';
import s from '../style.module.css';

const SearchResults = (props) => {
    console.log('SearchResults props:', props);
    return (
        <div className="row">
            <div className="col-12">
                <div className={[s['card'], s['card-margin']].join(' ')}>
                    <div className="card-body">
                        <div className={['row', s['search-body']]}>
                            <div className="col-lg-12">
                                <div className={s['search-result']}>
                                    {/* Заголовок результатов поиска */}
                                    <div className={s['result-header']}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className={s['records']}>Showing: <b>1-{/* results.product_ingredients | length */}</b> of results</div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className={s['result-actions']}>
                                                    <div>
                                                        <p className="m-0">E number</p>
                                                    </div>
                                                    <div className="result-views">
                                                        {/* if results.product_hazard_avg */}
                                                        <p>Product hazard avg {/* results.product_hazard_avg */}/10</p>
                                                        {/* endif */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="result-body">
                                        <div className="table-responsive">
                                           {/* <ResultsTable data={props.data} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default SearchResults;