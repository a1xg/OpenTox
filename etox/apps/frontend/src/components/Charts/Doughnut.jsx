import React from 'react';
import { ResponsivePie } from '@nivo/pie';
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
  return (
      <ResponsivePie
        data={props.data}
        margin={props.margin}
        innerRadius={0.85}
        padAngle={0.7}
        cornerRadius={3}
        colors={getColors(props.data)}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]]
        }}
        animate={true}
        enableRadialLabels={false}
      />
  )

};

export default Doughnut;