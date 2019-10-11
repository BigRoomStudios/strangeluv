
'use strict';

const Inert = require('@hapi/inert');
const Config = require('../config');
const Package = require('../package.json');

module.exports = {
    name: Package.name,
    register: async (server) => {

        server.path(Config.paths.build());

        await server.register(Inert);

        server.route({
            method: 'get',
            path: '/{p*}',
            config: {
                id: `${Package.name}-catchall`,
                handler: {
                    directory: { path: '.' }
                }
            }
        });

        const isGet = ({ method }) => method === 'get';

        const looksLikeFile = ({ path }) => path.lastIndexOf('.') > path.lastIndexOf('/');

        const takesHtml = ({ headers: { accept } }) => {

            return accept && (accept.includes('text/html') || accept.includes('*/*'));
        };

        const noOtherRoute = ({ method, path }) => {

            const route = server.match(method, path);

            return route && route.settings.id === `${Package.name}-catchall`;
        };

        const { prefix = '/' } = server.realm.modifiers.route;

        server.ext('onRequest', (request, h) => {

            if (isGet(request) &&
                takesHtml(request) &&
                !looksLikeFile(request) &&
                noOtherRoute(request)) {
                request.setUrl(prefix);
            }

            return h.continue;
        });
    }
};
