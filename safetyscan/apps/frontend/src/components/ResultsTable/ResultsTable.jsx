import React from 'react';
import s from '../style.module.css';

const ResultsTable = (props) => {
    console.log('ResultsTable props:', props);

    return (
        <table className={['table', s['widget-26']].join(' ')}>
            <tbody>
                {props.data.map(ingredient => {
                    return (
                        /* Типовая строка таблицы поисковой выдачи */                        
                        <tr key={ingredient.id}>
                            <td>
                                <div className={s['widget-26-job-emp-img']}>
                                    <img
                                        src="http://iconsetc.com/icons-watermarks/flat-square-white-on-black/bfa/bfa_flask/bfa_flask_flat-square-white-on-black_128x128.png"
                                        alt="Ingredient" />
                                </div>
                            </td>
                            <td>
                                <div className={s['widget-26-job-title']}>
                                    <a href={"api/ingredient/"+ingredient.id}>{ingredient.main_name}</a>
                                    <p className="m-0">
                                        <span className={['text-muted', s['time']].join(' ')}>{ingredient.id}</span>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div className={s['widget-26-job-salary']}>E number</div>
                            </td>
                            <td>{ingredient.hazard.ingredient_hazard_avg}/10</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default ResultsTable;
