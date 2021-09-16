import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { fill, defs } from './ChartsConfig';

const Doughnut = (props) => {
  console.log('Doughnut props', props);
  return (
    <ResponsivePie
    data={props.data}
    margin={{
      top: 40,
      right: 80,
      bottom: 80,
      left: 80
    }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{
      scheme: "nivo"
    }}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]]
    }}
    //arcLinkLabelsSkipAngle={10}
    //arcLinkLabelsTextColor="#333333"
    //arcLinkLabelsThickness={2}
    //arcLinkLabelsColor={{ from: 'color' }}
    //arcLabelsSkipAngle={10}
    //arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
    animate={true}
    enableRadialLabels={false}
    defs={defs}
    fill={fill}
  />
  )
  
};

export default Doughnut;