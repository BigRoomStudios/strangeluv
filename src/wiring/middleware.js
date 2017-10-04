const Thunk = require('redux-thunk').default;
const RouterMiddleware = require('react-router-redux').routerMiddleware;

const createHistory = require('history').createBrowserHistory;
const History = createHistory();

module.exports = [
    Thunk,
    RouterMiddleware(History)
];
