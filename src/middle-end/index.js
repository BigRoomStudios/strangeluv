const MiddleEnd = require('strange-middle-end');
const Redux = require('redux');
const ReduxDevtools = require('redux-devtools-extension/logOnlyInProduction');

const Auth = require('./auth');
const App = require('./app');
const Model = require('./model');
const Counter = require('./counter');
const Router = require('./router');
const Snackbar = require('./snackbar');

exports.create = (options = {}) => {

    const middleEnd = MiddleEnd.create({
        mods: () => ({
            auth: Auth(middleEnd, options),
            app: App(middleEnd, options),
            model: Model(middleEnd, options),
            counter: Counter(middleEnd, options),
            router: Router(middleEnd, options),
            snackbar: Snackbar(middleEnd, options)
        }),
        createStore: (reducer, { router }) => {

            const middleware = [
                MiddleEnd.middleware.thunk,
                options.logErrors && MiddleEnd.middleware.errorLogger,
                router.middleware
            ];

            return Redux.createStore(reducer, ReduxDevtools.composeWithDevTools(
                Redux.applyMiddleware(...middleware.filter(Boolean))
            ));
        }
    });

    return middleEnd;
};
