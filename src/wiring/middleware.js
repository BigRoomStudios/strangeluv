const Thunk = require('redux-thunk').default;
const RouterMiddleware = require('react-router-redux').routerMiddleware;
const PromiseMiddleware = require('redux-promise-middleware').default;

const History = require('./history');

module.exports = [
    Thunk,
    RouterMiddleware(History),
    PromiseMiddleware()
];
