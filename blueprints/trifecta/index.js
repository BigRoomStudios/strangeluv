module.exports = {
    description () {

        return 'generates action-type, action, and reducer files for a single entity';
    },

    fileMapTokens () {

        return {
            __root__: (options) => {

                const base = options.settings.getSetting('sourceBase');
                const route = options.entity.options.in;

                if (!route) {
                    return base;
                }

                return `${base}/routes/${route.replace('/', '/routes/')}`;
            }
        };
    }
};
