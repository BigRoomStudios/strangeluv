const _ = require('lodash');

const mergeSelectors = (selectorsMap, additionalSelectors) => {

    const result = {};
    const sources = {};

    // Constants look SOMETHING_LIKE_THIS
    const isConstants = (name) => (/^[A-Z_]+$/).test(name);

    const pushSelector = ({ sourceName, selectorName, selector, getState }) => {

        if (selectorName in result) {
            throw Error(
                'Duplicate selector.' +
                 `Selector '${selectorName}' is defined in '${sources[selectorName]}' and in '${sourceName}'`
            );
        }

        sources[selectorName] = sourceName;
        result[selectorName] = isConstants(selectorName) ? selector : (state, ...params) => selector(getState(state), ...params);
    };
    const pushSelectors = ({ sourceName, source, getState }) => {

        for (const selectorName in source) {
            pushSelector({ sourceName, selectorName, selector: source[selectorName], getState });
        }
    };

    for (const moduleName in selectorsMap) {
        pushSelectors({
            sourceName: moduleName, source: selectorsMap[moduleName].selectors, getState: (state) => state[moduleName]
        });
    }

    pushSelectors({ sourceName: 'additional-selectors', source: additionalSelectors, getState: _.identity });

    return result;
};

module.exports = {
    mergeSelectors
};
