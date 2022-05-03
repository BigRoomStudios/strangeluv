'use strict';

module.exports = {
    plugins: [
        'react-hot-loader/babel'
    ],
    presets: [
        'react-app',
        ['@babel/preset-react', {
            'runtime': 'automatic'
        }]
    ]
};
