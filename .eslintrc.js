'use strict';

module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    plugins: [
        'jsx-a11y',
        'react-hooks'
    ],
    extends: [
        'standard-react',
        'plugin:jsx-a11y/recommended',
        '@hapi/eslint-config-hapi'
    ],
    rules: {
        "react/jsx-indent": ['error', 4],
        "react/jsx-indent-props": ['error', 4],
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error'
    },
    overrides: [
        {
            files: ['!src/**'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ]
};
