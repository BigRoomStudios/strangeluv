const InRoute = require('../in-route');

module.exports = {
    description() {

        return 'generates action-type, action, and reducer files for a single entity';
    },

    locals(options) {

        return {
            // Don't adjust case
            entityName: options.entity.name
        };
    },

    fileMapTokens() {

        return {
            __root__: InRoute,
            __name__: (options) => {

                // Don't adjust case
                return options.entity.name;
            }
        };
    }
};
