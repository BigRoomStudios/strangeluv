const Redux = require('redux');
const Reducers = require('./reducers');
const Middleware = require('./middleware');
const Enhancers = require('./enhancers');

module.exports = (initialState = {}) => {

    // Store Instantiation and HMR Setup

    const store = Redux.createStore(
        Reducers.makeRoot(),
        initialState,
        Redux.compose(
            Redux.applyMiddleware(...Middleware),
            ...Enhancers
        )
    );

    store.asyncReducers = {};

    if (module.hot) {
        module.hot.accept('./reducers', () => {

            const nextReducer = require('./reducers').makeRoot(store.asyncReducers);
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};
