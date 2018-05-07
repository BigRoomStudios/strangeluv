const Connect = require('react-redux').connect;
const Login = require('../components/Login');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errorMessage: state.auth.error.message,
        rememberMe: state.auth.rememberMe
    }),
    {
        login: AuthAct.login,
        rememberAct: AuthAct.rememberMe
    }
);

module.exports = internals.connect(Login);
