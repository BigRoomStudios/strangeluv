const Redux = require('redux');
const ReduxDevtools = require('redux-devtools-extension/logOnlyInProduction');
const MiddleEnd = require('strange-middle-end');

module.exports = {
    mods: () => ({
        counter: require('./counter'),
        router: require('./router')
    }),
    createStore: (reducer, { router }) => {

        return Redux.createStore(reducer, ReduxDevtools.composeWithDevTools(
            Redux.applyMiddleware(
                MiddleEnd.middleware.thunk,
                MiddleEnd.middleware.errorLogger,    // TODO only in debug mode
                router.middleware
            )
        ));
    }
};
