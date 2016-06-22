const Url = require('url');
const Inert = require('inert');
const HapiWebpack = require('hapi-webpack-plugin');
const Package = require('../package.json');

const internals = {};

module.exports = (server, options, next) => {

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
        server.ext('onRequest', function (request, reply) {

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

module.exports.attributes = {
    pkg: Package
};

internals.takesHtml = (accept) => {

    if (!accept) {
        return false;
    }

    return (accept.indexOf('text/html') !== -1) || (accept.indexOf('*/*') !== -1);
};
