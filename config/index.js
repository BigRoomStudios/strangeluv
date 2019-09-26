'use strict';

const Path = require('path');
const Dotenv = require('dotenv');

Dotenv.config({ path: `${__dirname}/.env` });

// For interop with babel-preset-react-app
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    buildEnv: {
        NODE_ENV: process.env.NODE_ENV
    },
    isProduction: (process.env.NODE_ENV === 'production'),
    publicPath: '/',
    sourceMaps: true,
    devServer: {
        open: true,
        port: process.env.PORT || 3000,
        proxy: {}
    },
    paths: {
        root: (...args) => Path.resolve(__dirname, '..', ...args),
        src: (...args) => Path.resolve(__dirname, '../src', ...args),
        build: (...args) => Path.resolve(__dirname, '../build', ...args)
    }
};
