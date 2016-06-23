const Webpack = require('webpack');
const Config = require('./main');
const Debug = require('debug')('app:build:webpack-compiler');

module.exports = (webpackConfig, statsFormat) => {

    statsFormat = statsFormat || Config.compiler_stats;

    return new Promise((resolve, reject) => {

        const compiler = Webpack(webpackConfig);

        compiler.run((err, stats) => {

            const jsonStats = stats.toJson();

            Debug('Webpack compile completed.');
            Debug(stats.toString(statsFormat));

            if (err) {
                Debug('Webpack compiler encountered a fatal error.', err);
                return reject(err);
            }
            else if (jsonStats.errors.length > 0) {
                Debug('Webpack compiler encountered errors.');
                Debug(jsonStats.errors.join('\n'));
                return reject(new Error('Webpack compiler encountered errors'));
            }
            else if (jsonStats.warnings.length > 0) {
                Debug('Webpack compiler encountered warnings.');
                Debug(jsonStats.warnings.join('\n'));
            }
            else {
                Debug('No errors or warnings encountered.');
            }
            resolve(jsonStats);
        });
    });
};
