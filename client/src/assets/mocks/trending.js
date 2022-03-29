import moment from 'moment'

export default [
    {
        title: 'this is 1',
        createdAt: moment().format('MMM Do, YYYY'),
        tags: [
            { tag: 'tech', _typename: 'tag' },
            { tag: 'news', _typename: 'tag' }
        ],
        link: '#',
        image: '243H.jpg'
    },
    {
        title: 'this is 2',
        createdAt: moment().format('MMM Do, YYYY'),
        tags: [
            { tag: 'tech' },
            { tag: 'news' }
        ],
        link: '#',
        image: '259H.jpg'
    },
    {
        title: 'this is 3',
        createdAt: moment().format('MMM Do, YYYY'),
        tags: [
            { tag: 'tech' },
            { tag: 'news' }
        ],
        link: '#',
        image: '259H.jpg'
    },
    {
        title: 'this is 4',
        createdAt: moment().format('MMM Do, YYYY'),
        tags: [
            { tag: 'tech' },
            { tag: 'news' }
        ],
        link: '#',
        image: '268H.jpg'
    },
    {
        title: 'trending post 1',
        createdAt: moment().format('MMM Do, YYYY'),
        tags: [
            { tag: 'tech' },
            { tag: 'news' }
        ],
        link: '#',
        image: '295H.jpg'
    },
    {
        title: 'trending post 2',
        createdAt: moment().format('MMM Do, YYYY'),
        tags: [
            { tag: 'tech' },
            { tag: 'news' }
        ],
        link: '#',
        image: 'n95.jpg'
    },
    {
        title: 'trending post 3',
        createdAt: moment().format('MMM Do, YYYY'),
        tags: [
            { tag: 'tech' },
            { tag: 'news' }
        ],
        image: '359H.jpg'
    }

]
