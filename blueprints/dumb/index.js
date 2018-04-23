const InRoute = require('../in-route');

module.exports = {
    description() {

        return 'generates a dumb (pure) component';
    },

    fileMapTokens() {

        return {
            __root__: InRoute
        };
    }
};
