import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { defs, fill } from './ChartsConfig';
import { BoxLegendSvg } from "@nivo/legends"; //! кастомна легенда

const testFill = [
    {
        match: {
            id: 'bar1'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'bar2'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'bar4'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'bar6'
        },
        id: 'dots'
    }
];

const testData = [
    {
        id:"bar1",
        label:"label1",
        value: 8,
    },
    {
        id:"bar2",
        label:"label2",
        value: 2
    },
    {
        id:"bar3",
        label:"label3",
        value: 4
    },
    {
        id: "bar4",
        label: "label4",
        value: 6
    },
    {
        id: "bar5",
        label: "label5",
        value: 6
    },
    {
        id: "bar6",
        label: "label6",
        value: 6
    }
];

const testDefs = [
    {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true
    },
    {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10
    }
];

const Bar = (props) => {
    console.log('Bar props', props);
    return (
        <ResponsiveBar
            data={props.data}
            indexBy="id"
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            padding={0.4}
            layout="vertical"
            colors={{ scheme: 'nivo' }}
            colorBy="index"
            defs={defs}
            fill={fill}
            borderColor={{ from: "color", modifiers: [["brighter", "1.6"]] }}
            axisTop={null}
            axisRight={null}
            enableGridX={true}
            enableGridY={false}
            labelSkipWidth={42}
            labelSkipHeight={12}
            labelTextColor="#fff"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
        />
    )

};

export default Bar;