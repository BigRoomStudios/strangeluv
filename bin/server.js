const Server = require('../server');
const Debug = require('debug')('app:bin:server');

(async () => {

    const server = await Server.deployment();
    await server.start();
    // Gracefully shutdown for nodemon
    process.once('SIGUSR2', async () => {

        await server.stop();
        Debug('Server shutdown.');
        process.exit(0);
    });

    Debug(`Server is now running at ${server.info.uri}.`);
})();
