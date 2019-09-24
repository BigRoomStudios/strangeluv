const Redux = require('redux');
const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.create({
    mods: () => ({
        counter: require('./counter'),
        router: require('./router')
    }),
    createStore: (reducer, { router }) => {

        return Redux.createStore(reducer, Redux.applyMiddleware(
            MiddleEnd.middleware.thunk,
            MiddleEnd.middleware.errorLogger,    // TODO only in debug mode
            router.middleware
        ));
    }
});
