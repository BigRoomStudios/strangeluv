module.exports = (m, options) => {

    return {
        reducer: require('./reducer'),
        actions: require('./actions')(m, options),
        selectors: require('./selectors')
    };
};
