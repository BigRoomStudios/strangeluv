'use strict';

const Config = require('.');

module.exports = {
    rootDir: Config.paths.root(),
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
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(js)$': 'babel-jest',
        '^(?!.*\\.(js|json)$)': '<rootDir>/config/jest.file-transform.js'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js)$'
    ]
};
