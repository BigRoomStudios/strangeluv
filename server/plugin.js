const StrangeluvCore = require('strangeluv-core/lib/plugin');
const Webpack = require('webpack');
const WebpackConfig = require('../config/webpack.config');
const Config = require('../config/main');
const Package = require('../package.json');

// The app as a plugin

module.exports = (server, options, next) => {

    server.register({
        register: StrangeluvCore,
        options: {
            dist: Config.utils_paths.dist(),
            static: Config.utils_paths.client('static'),
            compiler: (Config.env === 'dev') && Webpack(WebpackConfig),
            assets: {
                publicPath: WebpackConfig.output.publicPath,
                contentBase: Config.utils_paths.client(),
                hot: true,
                quiet: Config.compiler_quiet,
                noInfo: Config.compiler_quiet,
                lazy: false,
                stats: Config.compiler_stats
            }
        }
    }, next);
};

module.exports.attributes = {
    pkg: Package
};
