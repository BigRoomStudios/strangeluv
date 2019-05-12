const Redux = require('redux');
const { default: Thunk } = require('redux-thunk');
const { routerMiddleware: RouterMiddleware } = require('react-router-redux');

module.exports = (reducer, { history } = {}) => {

    // Middleware

    const middleware = [
        Thunk
    ];

    if (history) {
        middleware.push(RouterMiddleware(history));
    }

    // Enhancers

    const enhancers = [];

    if (__DEBUG__) {
        const { devToolsExtension } = window;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    // Store

    const store = Redux.createStore(
        reducer, {},
        Redux.compose(
            Redux.applyMiddleware(...middleware),
            ...enhancers
        )
    );

    return store;
};
