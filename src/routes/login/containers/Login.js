const Connect = require('react-redux').connect;
const Login = require('../components/Login');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        // TODO: Have error in state like this, or dispatch an error action like MBM?
        errored: state.auth.error.login,
        rememberMe: state.auth.rememberMe
    }),
    {
        login: AuthAct.login,
        rememberAct: AuthAct.rememberMe
    }
);

module.exports = internals.connect(Login);