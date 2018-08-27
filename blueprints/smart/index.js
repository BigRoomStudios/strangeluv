const InRoute = require('../in-route');

module.exports = {
    description() {

        return 'generates a smart (container) component';
    },

    fileMapTokens() {

        return {
            __root__: InRoute,
            __smart__: (options) => {

                return options.settings.getSetting('smartPath');
            }
        };
    }
};
