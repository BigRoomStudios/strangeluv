const Redux = require('redux');
const Wiring = require('./');
const CounterRouter = require('../routes/counter/reducers/counter');
console.log('CounterRouter', CounterRouter);

exports.makeRoot = (asyncReducers) => {

    return Redux.combineReducers({
        ...Wiring.reducers(), // Everything in reducers/
        ...asyncReducers,
        counter: CounterRouter 
    });
};

exports.inject = (store, { key, reducer }) => {

    store.asyncReducers[key] = reducer;
    const root = exports.makeRoot(store.asyncReducers);
    store.replaceReducer(root);
};
