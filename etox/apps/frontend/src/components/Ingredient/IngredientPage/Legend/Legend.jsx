import React from 'react';
import GridItem from '../../../GridItem/GridItem.jsx';
// !TODO предусмотреть отсутствие данных для отображения и вывести заглушку
const Legend = (props) => {
    return (
        <div>
            <p>Total notifications:  {props.total_notifications} </p>
            <p>Sourse: <a
                href={"https://echa.europa.eu/information-on-chemicals/cl-inventory-database/-/discli/details/" + props.source}>European
                Chemicals Agency (ECHA)</a></p>
        </div>
    )

};

export default Legend;