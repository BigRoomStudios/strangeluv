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
        entry: WebpackConfig.entry,
        devtool: 'cheap-module-source-map',
        resolve: WebpackConfig.resolve,
        plugins: WebpackConfig.plugins,
        module: {
            rules: WebpackConfig.module.rules.concat([
                {
                    test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
                    use: ['imports-loader?define=>false,require=>false']
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
        }
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
    karmaConfig.webpack.module.rules.push({
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        include: new RegExp(Config.dir_client),
        exclude: /node_modules/,
        use: ['isparta-loader']
    });
}

module.exports = (cfg) => cfg.set(karmaConfig);
