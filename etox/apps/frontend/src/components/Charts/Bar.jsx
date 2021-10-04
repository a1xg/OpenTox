import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import Tooltip from './ToolTip.jsx';

const getColors = (data) => {
  let colors = []
  data.map(d => {
    colors.push(d.color)
  });
  return colors
};


const Bar = (props) => {
  console.log('Bar props', props);
  return (
    <ResponsiveBar
      data={props.data}
      keys={['value', "label", "id"]}
      indexBy="label"
      colorBy='index'
      colors={getColors(props.data)}
      margin={props.margin}
      padding={0.7}
      maxValue={props.maxValue}
      layout="vertical"
      borderColor="inherit:darker(1.6)"
      enableLabel={false}
      enableGridX={false}
      enableGridY={false}
      tooltip={({index}) => (
        <Tooltip
          index={props.data[index]}
          label={props.data[index]['label']}
          value={props.data[index]['value']}
          color={props.data[index]['color']}
          caption={props.caption}
        />
      )}
      axisBottom={null}
    />
  )
};

export default Bar;