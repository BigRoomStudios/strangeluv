const History = require('history');
const ConnectedRouter = require('connected-react-router');

const history = History.createBrowserHistory();

module.exports = {
    history,
    middleware: ConnectedRouter.routerMiddleware(history),
    reducer: ConnectedRouter.connectRouter(history),
    actions: {
        push: ConnectedRouter.push,
        replace: ConnectedRouter.replace,
        go: ConnectedRouter.go,
        goBack: ConnectedRouter.goBack,
        goForward: ConnectedRouter.goForward
    },
    selectors: {
        getRouter: ConnectedRouter.getRouter,
        getAction: ConnectedRouter.getAction,
        getHash: ConnectedRouter.getHash,
        getLocation: ConnectedRouter.getLocation,
        getSearch: ConnectedRouter.getSearch
    }
};
