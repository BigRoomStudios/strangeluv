/* eslint key-spacing:0 spaced-comment:0 */
const Path = require('path');
const Argv = require('yargs').argv;
const Environments = require('./environments');
const Package = require('../package.json');
const Debug = require('debug')('app:config');

Debug('Creating default configuration.');

// ========================================================
// Default Configuration
// ========================================================
const config = module.exports = {
    env : process.env.NODE_ENV || 'dev',

    // ----------------------------------
    // Project Structure
    // ----------------------------------
    path_base  : Path.resolve(__dirname, '..'),
    dir_client : 'src',
    dir_dist   : 'dist',
    dir_server : 'server',
    dir_test   : 'tests',

    // ----------------------------------
    // Server Configuration
    // ----------------------------------
    server_host : '0.0.0.0', // use string 'localhost' to prevent exposure on local network
    server_port : process.env.PORT || 3000,

    // ----------------------------------
    // Compiler Configuration
    // ----------------------------------
    compiler_css_modules     : true,
    compiler_devtool         : 'source-map',
    compiler_hash_type       : 'hash',
    compiler_fail_on_warning : false,
    compiler_quiet           : false,
    compiler_public_path     : '/',
    compiler_stats           : {
        chunks : false,
        chunkModules : false,
        colors : true
    },
    compiler_vendor : [
        'history',
        'react',
        'react-redux',
        'react-router',
        'react-router-redux',
        'redux',
        'strangeluv-core'
    ],

    // ----------------------------------
    // Test Configuration
    // ----------------------------------
    coverage_reporters : [
        { type : 'text-summary' },
        { type : 'lcov', dir : 'coverage' }
    ]
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
    'process.env'  : {
        'NODE_ENV' : JSON.stringify(config.env)
    },
    'NODE_ENV'     : config.env,
    '__DEV__'      : config.env === 'dev',
    '__PROD__'     : config.env === 'production',
    '__TEST__'     : config.env === 'test',
    '__DEBUG__'    : config.env === 'dev' && !Argv.no_debug,
    '__COVERAGE__' : !Argv.watch && config.env === 'test',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
config.compiler_vendor = config.compiler_vendor.filter((dep) => {

    if (Package.dependencies[dep]) {
        return true;
    }

    Debug(
        `Package "${dep}" was not found as an npm dependency in package.json; ` +
        'it won\'t be included in the webpack vendor bundle.' +
        'Consider removing it from vendor_dependencies in ~/config/index.js'
    );
});

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = Path.resolve;
const base = (...args) => {

    return Reflect.apply(resolve, null, [config.path_base, ...args]);
};


config.utils_paths = {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist)
};

// ========================================================
// Environment Configuration
// ========================================================
Debug(`Looking for environment overrides for NODE_ENV "${config.env}".`);
const overrides = Environments[config.env];
if (overrides) {
    Debug('Found overrides, applying to default configuration.');
    Object.assign(config, overrides(config));
}
else {
    Debug('No environment overrides found, defaults will be used.');
}
