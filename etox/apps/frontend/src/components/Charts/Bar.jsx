import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { defs, fill } from './ChartsConfig';

/*
const testFill = [
    {
        match: {
            id: 'Suspected of causing cancer'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'May damage fertility or the unborn child.'
        },
        id: 'lines'
    }
];

const testData = [
    {
      id: "A",
      value: 85,
      label: 'testlabel1'
    },
    {
      id: "B",
      value: 128,
      label: 'testlabel2'
    },
    {
      id: "C",
      value: 12,
      label: 'testlabel3'
    }
  
  ];

const testDefs = [
    {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true
    },
    {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10
    }
];

const getKeys = (props) => {
    let keys = [];
    props.map(item => {
        keys.push(item.id)
    });
    return keys;
};
*/

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
      //groupMode="grouped"
      colorBy='index'
      colors={getColors(props.data)} // { scheme: 'nivo' }
      margin={{
        top: 50,
        right: 50,
        bottom: 50,
        left: 60
      }}
      padding={0.3}
      defs={defs}
      fill={fill}
      layout="vertical"
      borderColor="inherit:darker(1.6)"
      enableLabel={false}
      enableGridX={true}
      enableGridY={false}
      axisBottom={null}
    />
  )
};

export default Bar;