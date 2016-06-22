const Url = require('url');
const Inert = require('inert');
const HapiWebpack = require('hapi-webpack-plugin');
const Config = require('../config');
const Webpack = require('webpack');
const WebpackConfig = require('../build/webpack.config');
const Package = require('../package.json');

const internals = {};

// The app as a plugin

module.exports = (server, options, next) => {

    server.register({
        register: internals.corePlugin,
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

// The core plugin, to be module-ized

internals.corePlugin = (server, options, next) => {

    const dev = !!options.compiler;

    const plugins = [Inert];

    if (dev) {
        plugins.push({
            register: HapiWebpack,
            options: {
                compiler: options.compiler,
                assets: options.assets,
                hot: options.hot
            }
        });
    }

    server.path(dev ? options.static : options.dist);

    server.register(plugins, (err) => {

        if (err) {
            return next(err);
        }

        // Serves static or dist
        server.route({
            method: 'get',
            path: '/{p*}',
            handler: {
                directory: { path: '.' }
            }
        });

        // To work with the history API
        server.ext('onRequest', (request, reply) => {

            const isGet = (request.method === 'get');
            const takesHtml = internals.takesHtml(request.headers.accept);
            const looksLikeFile = (request.path.indexOf('.') === -1);

            if (looksLikeFile && isGet && takesHtml) {
                request.setUrl('/');
                request.raw.req.url = Url.format(request.url);
            }

            reply.continue();
        }, {
            before: 'webpack'
        });

        next();
    });
};

internals.corePlugin.attributes = {
    name: 'react-boilerplate-core'
};

internals.takesHtml = (accept) => {

    if (!accept) {
        return false;
    }

    return (accept.indexOf('text/html') !== -1) || (accept.indexOf('*/*') !== -1);
};
