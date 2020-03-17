const Redux = require('redux');
const ReduxDevtools = require('redux-devtools-extension/logOnlyInProduction');
const MiddleEnd = require('strange-middle-end');

module.exports = {
    mods: () => ({
        counter: require('./counter'),
        router: require('./router')
    }),
    createStore: (reducer, { router }) => {

        const middleware = [
            MiddleEnd.middleware.thunk,
            process.env.NODE_ENV !== 'test' && MiddleEnd.middleware.errorLogger,
            router.middleware
        ];

        return Redux.createStore(reducer, ReduxDevtools.composeWithDevTools(
            Redux.applyMiddleware(...middleware.filter(Boolean))
        ));
    }
};
