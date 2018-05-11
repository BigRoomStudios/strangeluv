const Hapi = require('hapi');
const App = require('./plugin');
const Config = require('../config/main');

exports.deployment = async () => {

    const server = Hapi.Server({
        host: Config.server_host,
        port: Config.server_port
    });

    await server.register(App);

    return server;
};
