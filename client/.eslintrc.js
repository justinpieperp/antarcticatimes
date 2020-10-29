module.exports = {
    root: true,
    settings: {
        react: {
            createClass: 'createReactClass', // Regex for Component Factory to use,
            pragma: 'React', // Pragma to use, default to "React"
            fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
            version: 'detect', // React version. "detect" automatically picks the version you have installed.
            flowVersion: '0.53' // Flow version
        },
        propWrapperFunctions: [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            'forbidExtraProps',
            { property: 'freeze', object: 'Object' },
            { property: 'myFavoriteWrapper' }
        ],
        linkComponents: [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            'Hyperlink',
            { name: 'Link', linkAttribute: 'to' }
        ]
    },
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'standard'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12
    },
    plugins: [
        'react'
    ],
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        indent: ['error', 4],
        'react/prop-types': 0
    }
}
