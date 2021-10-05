import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import ToolTip from './ToolTip.jsx';
//! версия с которой норм работает Doughnut 0.62.0, с весиями выше - вместо label отображается id
 
const getColors = (data) => {
  let colors = []
  data.map(d => {
    colors.push(d.color)
  });
  return colors
};

const Doughnut = (props) => {
  console.log('Doughnut props', props);
  const data = props.data;
  return (
    props.data.length > 0 &&
      <ResponsivePie
        data={data}
        margin={props.margin}
        keys={['value', "label", "id"]}
        innerRadius={0.85}
        padAngle={0.7}
        cornerRadius={3}
        colors={getColors(props.data)}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]]
        }}
        tooltip={({index}) => (
          <ToolTip
            index={index}
            label={props.data[index]['label']}
            value={props.data[index]['value']}
            color={props.data[index]['color']}
            caption={props.caption}
          />
        )}
        enableRadialLabels={false}
      />
  )

};

export default Doughnut;