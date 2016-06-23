const Argv = require('yargs').argv;
const Config = require('./main');
const WebpackConfig = require('./webpack.config');
const Debug = require('debug')('app:karma');

Debug('Create configuration.');

const karmaConfig = {
    basePath: '../', // project root in relation to bin/karma.js
    files: [
        {
            pattern: `./${Config.dir_test}/test-bundler.js`,
            watched: false,
            served: true,
            included: true
        }
    ],
    singleRun: !Argv.watch,
    frameworks: ['mocha'],
    reporters: ['mocha'],
    preprocessors: {
        [`${Config.dir_test}/test-bundler.js`]: ['webpack']
    },
    browsers: ['PhantomJS'],
    webpack: {
        devtool: 'cheap-module-source-map',
        resolve: {
            ...WebpackConfig.resolve,
            alias: {
                ...WebpackConfig.resolve.alias,
                sinon: 'sinon/pkg/sinon.js'
            }
        },
        plugins: WebpackConfig.plugins,
        module: {
            noParse: [
                /\/sinon\.js/
            ],
            loaders: WebpackConfig.module.loaders.concat([
                {
                    test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
                    loader: 'imports?define=>false,require=>false'
                }
            ])
        },
        // Enzyme fix, see:
        // https://github.com/airbnb/enzyme/issues/47
        externals: {
            ...WebpackConfig.externals,
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': 'window'
        },
        sassLoader: WebpackConfig.sassLoader
    },
    webpackMiddleware: {
        noInfo: true
    },
    coverageReporter: {
        reporters: Config.coverage_reporters
    }
};

if (Config.globals.__COVERAGE__) {
    karmaConfig.reporters.push('coverage');
    karmaConfig.webpack.module.preLoaders = [{
        test: /\.(js|jsx)$/,
        include: new RegExp(Config.dir_client),
        loader: 'isparta',
        exclude: /node_modules/
    }];
}

module.exports = (cfg) => cfg.set(karmaConfig);
