const LabbableServer = require('../server');
const Debug = require('debug')('app:bin:server');

LabbableServer.ready({ immediate: true }, (err, server) => {

    if (err) {
        throw err;
    }

    // Gracefully shutdown for nodemon
    process.once('SIGUSR2', () => {

        server.stop((err) => {

            if (err) {
                throw err;
            }

            process.exit(0);
        });
    });

    server.ext('onPostStop', (srv, next) => {

        Debug('Server shutdown');
        next();
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        Debug(`Server is now running at ${server.info.uri}.`)
    });
});
