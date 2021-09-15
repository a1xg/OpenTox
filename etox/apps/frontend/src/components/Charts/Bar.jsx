import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { defs, backgroundMap } from './ChartsConfig';
import { BoxLegendSvg } from "@nivo/legends"; //! кастомна легенда

const fill = [
    {
        match: {
            id: 'fries'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'sandwich'
        },
        id: 'lines'
    }
];

const data = [
    {
        "id": "b",
        "hot dog": 65,
        "hot dogColor": "hsl(303, 70%, 50%)",
    },
    {
        "id": "c",
        "burger": 109,
        "burgerColor": "hsl(237, 70%, 50%)",
    },
    {
        "id": "d",
        "sandwich": 136,
        "sandwichColor": "hsl(92, 70%, 50%)",
    },
    {
        "id": "e",
        "kebab": 188,
        "kebabColor": "hsl(78, 70%, 50%)",
    },
    {
        "id": "f",
        "fries": 120,
        "friesColor": "hsl(3, 70%, 50%)",
    },
    {
        "id": "g",
        "donut": 158,
        "donutColor": "hsl(292, 70%, 50%)"
    },
  ];


const Bar = (props) => {
    console.log('Bar props', props);
    return (
        <ResponsiveBar
        data={props.c}
        keys={['value']}
        indexBy="id"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        valueFormat={{ format: '', enabled: false }}
        colors={{ scheme: 'nivo' }}
        defs={defs}
        fill={backgroundMap}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        colorBy='index'
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'id',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        
    />
    )

};

export default Bar;