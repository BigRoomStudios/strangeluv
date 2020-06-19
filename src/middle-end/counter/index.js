module.exports = (m, options) => {

    return {
        reducer: require('./reducer'),
        actions: require('./actions')(m),
        selectors: require('./selectors')
    };
};


