const tagColors = {
    NATURE: 'rgb(255,59,48)',
    CULTURE: 'rgb(0,113,164)',
    TECH: 'rgb(0,113,164)',
    NEWS: 'rgb(52,199,89)',
    EVERYTHING: 'rgb(255,45,85)',
    EDUCATION: 'rgb(64,156,255)',
    'DAILY LIFE': 'rgb(255,45,85)',
    'NEW YORK': 'rgb(255, 179, 64)',
    'LOS ANGELES': 'rgb(175,82,250)'
}

const featuredConfig = {
    1: {
        gridArea: '1 / 2 / 3 / 3'
    }
}

const trendingConfig = {
    0: {
        gridArea: '1 / 1 / 2 / 3',
        height: '300px'
    },
    1: {
        height: '300px'
    },
    3: {
        height: '630px',
        marginLeft: '30px',
        width: '630px'
    }
}

export {
    tagColors,
    trendingConfig,
    featuredConfig
}
