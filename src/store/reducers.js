const Redux = require('redux');
const RouterReducer = require('react-router-redux').routerReducer;
const Wiring = require('../wiring');

exports.makeRoot = (asyncReducers) => {

    return Redux.combineReducers({
        router: RouterReducer,
        ...Wiring.reducers(), // Everything in reducers/
        ...asyncReducers
    });
};

exports.inject = (store, { key, reducer }) => {

    store.asyncReducers[key] = reducer;
    const root = exports.makeRoot(store.asyncReducers);
    store.replaceReducer(root);
};
