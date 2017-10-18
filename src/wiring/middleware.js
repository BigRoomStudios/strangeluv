const Thunk = require('redux-thunk').default;
const RouterMiddleware = require('react-router-redux').routerMiddleware;

const History = require('./history');

module.exports = [
    Thunk,
    RouterMiddleware(History)
];
