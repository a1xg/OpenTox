

const colorMap = {
    'ASPIRATION_TOXICITY':'#8ed4c8',
    'SKIN_CORROSION_IRRITATION':'#bfbbdb',
    'EYE_DAMAGE_IRRITATION':'#ffee70',
    'RESPIRATORY_SKIN_SENSITISERS':'#fb8173',
    'ACUTE_TOXICITY':'#81b2d4',
    'MUTAGENICITY':'#fdb562',
    'CARCINOGENICITY':'#b4df69',
    'REPRODUCTIVE_TOXICITY':'#fccee6',
    'TARGET_ORGAN_TOXICITY':'#bd81be',
    'NO_DATA_AVAILABLE': '#dadada',
}

/* 
    'ASPIRATION_TOXICITY':
    'SKIN_CORROSION_IRRITATION':"Causes skin irritation"
    'EYE_DAMAGE_IRRITATION':"Causes serious eye irritation"
    'RESPIRATORY_SKIN_SENSITISERS':"May cause an allergic skin reaction"
    'ACUTE_TOXICITY':"Harmful if swallowed"
    'MUTAGENICITY':"Suspected of causing genetic defects"
    'CARCINOGENICITY':"Suspected of causing cancer"
    'REPRODUCTIVE_TOXICITY':"May damage fertility or the unborn child."
    'TARGET_ORGAN_TOXICITY':"May cause respiratory irritation."
    'NO_DATA_AVAILABLE': 'Data ton avaliable'
*/

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
    /*
    {
        match: {
           id: 'EYE_DAMAGE_IRRITATION'
       },
        id: 'dots'
    },
    */
    {
        match: {
            id: 'RESPIRATORY_SKIN_SENSITISERS'
        },
        id: 'dots'
    },
    /*
    {
        match: {
            id: 'ACUTE_TOXICITY'
        },
        id: 'lines'
    },
    */
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

export { fill, defs, colorMap };