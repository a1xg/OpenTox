
const ratingColorMap = {
    1: '#3afe03',
    2: '#a0fd01',
    3: '#fffd00',
    4: '#ffeb00',
    5: '#ffe000',
    6: '#ffc500',
    7: '#ff9f00',
    8: '#ff6e00',
    9: '#ff5800',
    10:'#ff0000',
};

const chartColorMap = {
    'ASPIRATION_TOXICITY': '#8ed4c8',
    'SKIN_CORROSION_IRRITATION': '#bfbbdb',
    'EYE_DAMAGE_IRRITATION': '#ffee70',
    'RESPIRATORY_SKIN_SENSITISERS': '#b4df69',
    'ACUTE_TOXICITY': '#81b2d4',
    'MUTAGENICITY': '#fdb562',
    'CARCINOGENICITY': '#fb8173',
    'REPRODUCTIVE_TOXICITY': '#fccee6',
    'TARGET_ORGAN_TOXICITY': '#bd81be',
    'NO_DATA_AVAILABLE': '#dadada',
}

const defs = [
    {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        size: 4,
        padding: 1,
        stagger: true
    },
    {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(255, 255, 255, 0.3)',
        rotation: -45,
        lineWidth: 6,
        spacing: 10
    }
];

const fill = [
    {
        match: {
            id: 'ASPIRATION_TOXICITY'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'SKIN_CORROSION_IRRITATION'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'RESPIRATORY_SKIN_SENSITISERS'
        },
        id: 'dots'
    },
    {
        match: {
            id: 'MUTAGENICITY'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'CARCINOGENICITY'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'REPRODUCTIVE_TOXICITY'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'TARGET_ORGAN_TOXICITY'
        },
        id: 'lines'
    },
    {
        match: {
            id: 'NO_DATA_AVAILABLE'
        },
        id: 'lines'
    }
];

export { fill, defs, chartColorMap, ratingColorMap };