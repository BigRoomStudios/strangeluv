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
            __root__: (options) => {

                const base = options.settings.getSetting('sourceBase');
                const route = options.entity.options.in;

                if (!route) {
                    return base;
                }

                return `${base}/routes/${route.replace('/', '/routes/')}`;
            },
            __name__: (options) => {

                // Don't adjust case
                return options.entity.name;
            }
        };
    }
};
