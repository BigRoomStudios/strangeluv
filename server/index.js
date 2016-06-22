const Hapi = require('hapi');
const Labbable = require('labbable');
const CorePlugin = require('./plugin');
const Config = require('../config');
const Webpack = require('webpack');
const WebpackConfig = require('../build/webpack.config');

const labbable = module.exports = new Labbable();

const server = new Hapi.Server();

server.connection({
    host: Config.server_host,
    port: Config.server_port
});

server.register({
    register: CorePlugin,
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
}, (err) => {

    if (err) {
        throw err;
    }

    labbable.using(server);
});
