const Thunk = require('redux-thunk').default;
const RouterMiddleware = require('react-router-redux').routerMiddleware;

const History = require('./history');
const APIMiddleware = require('./api-middleware');

module.exports = [
    Thunk,
    RouterMiddleware(History),
    APIMiddleware
];
