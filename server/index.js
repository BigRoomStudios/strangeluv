const Hapi = require('hapi');
const Labbable = require('labbable');
const App = require('./plugin');
const Config = require('../config');

const labbable = module.exports = new Labbable();

const server = new Hapi.Server();

server.connection({
    host: Config.server_host,
    port: Config.server_port
});

server.register(App, (err) => {

    if (err) {
        throw err;
    }

    labbable.using(server);
});
