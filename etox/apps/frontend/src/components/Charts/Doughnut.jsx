import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { fill, defs } from './ChartsConfig';
// версия с которой норм работает Doughnut 0.62.0, с весиями выше - вместо label отображается id

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
    margin={{
      top: 40,
      right: 40,
      bottom: 40,
      left: 40
    }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={getColors(props.data)} // { scheme: "nivo" }
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]]
    }}
    animate={true}
    enableRadialLabels={false}
    //defs={defs}
    //fill={fill}
  />
  )
  
};

export default Doughnut;