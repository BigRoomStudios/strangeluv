// Return this as the value of __root__ in any fileMapTokens() to
// enable the "--in=" option, placing the blueprint under a route dir
module.exports = (options) => {

    const base = options.settings.getSetting('sourceBase');
    const route = options.entity.options.in;

    if (!route) {
        return base;
    }

    return `${base}/routes/${route.replace('/', '/routes/')}`;
};
