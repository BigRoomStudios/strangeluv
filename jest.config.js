'use strict';

module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    collectCoverageFrom: [
        'src/**/*.js'
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.js',
        '<rootDir>/src/**/*.{spec,test}.js'
    ],
    testEnvironment: 'jest-environment-jsdom-fifteen',
    transform: {
        '^.+\\.(js)$': 'babel-jest',
        '^(?!.*\\.(js|json)$)': '<rootDir>/jest-file-transform.js'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js)$'
    ]
};
