import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { defs, fill } from './ChartsConfig';

const getColors = (data) => {
  let colors = []
  data.map(d => {
    colors.push(d.color)
  });
  return colors
};
//!FIXME максимальное значение измерительной шкалы не зафиксировано 
const Bar = (props) => {
  console.log('Bar props', props);
  return (
    <ResponsiveBar
      data={props.data}
      keys={['value', "label", "id"]}
      indexBy="label"
      colorBy='index'
      colors={getColors(props.data)}
      margin={{
        top: 50,
        right: 50,
        bottom: 50,
        left: 60
      }}
      padding={0.7}
      defs={defs}
      fill={fill}
      layout="vertical"
      borderColor="inherit:darker(1.6)"
      enableLabel={false}
      enableGridX={false}
      enableGridY={false}
      axisBottom={null}
    />
  )
};

export default Bar;