const InRoute = require('../in-route');

module.exports = {
    description() {

        return 'generates a functional layout component';
    },

    fileMapTokens() {

        return {
            __root__: InRoute
        };
    }
};
