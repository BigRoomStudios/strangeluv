'use strict';

const Hapi = require('@hapi/hapi');
const AppPlugin = require('./plugin');
const Config = require('../config');

exports.deployment = async (start) => {

    const { serveAtPublicPath, ...serverConfig } = Config.buildServer;

    const server = Hapi.server(serverConfig);

    await server.register(AppPlugin, {
        routes: {
            ...(serveAtPublicPath && Config.publicPath !== '/' && {
                prefix: Config.publicPath
            })
        }
    });

    await server.initialize();

    if (!start) {
        return server;
    }

    await server.start();

    console.log(`Server started at ${server.info.uri}`);

    return server;
};

if (!module.parent) {

    exports.deployment(true);

    process.on('unhandledRejection', (err) => {

        throw err;
    });
}
