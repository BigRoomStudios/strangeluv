'use strict';

const Path = require('path');
const Dotenv = require('dotenv');

Dotenv.config({ path: `${__dirname}/.env` });

// For interop with babel-preset-react-app
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    buildEnv: {
        // Set in addition to BASE_PATH
        NODE_ENV: process.env.NODE_ENV
    },
    isProduction: (process.env.NODE_ENV === 'production'),
    publicPath: process.env.PUBLIC_PATH || '/',
    sourceMaps: true,
    devServer: {
        open: true,
        port: process.env.PORT || 3000,
        proxy: {}
    },
    buildServer: {
        port: process.env.PORT || 3000,
        host: 'localhost',
        serveAtPublicPath: true
    },
    paths: {
        root: (...args) => Path.resolve(__dirname, '..', ...args),
        src: (...args) => Path.resolve(__dirname, '..', 'src', ...args),
        build: (...args) => Path.resolve(__dirname, '..', 'build', ...args)
    }
};
