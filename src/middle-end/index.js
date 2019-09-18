const Redux = require('redux');
const { routerMiddleware: RouterMiddleware } = require('react-router-redux');
const { middleware: { thunk, errorLogger }, ...MiddleEnd } = require('strange-middle-end');

const Enhancers = require('./enhancers');
const History = require('./history');

// After the middle-end has been initialized, 'M.create' will return the
// initialized middle-end where initializers have been called
// and middleware, mods have been registered.
module.exports = MiddleEnd.create({
    // In many applications, files in './mods' require this middle-end,
    // which creates a circular dependency since mods are needed here in 'M.create'.
    // Specifying 'mods' here as a function allows our mods to require this middle-end
    // lazily and in a controlled way, which is at some point after 'M.initialize()' is called.
    // In this app, 'M.initialize()' is called in /src/main.js.
    mods: () => require('./mods'),
    createStore: (reducer) => {

        return Redux.createStore(
            reducer,
            Redux.compose(
                Redux.applyMiddleware(
                    thunk,
                    errorLogger,
                    RouterMiddleware(History)
                ),
                ...Enhancers
            )
        );
    }
});
