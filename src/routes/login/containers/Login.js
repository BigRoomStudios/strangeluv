const Connect = require('react-redux').connect;
const Login = require('../components/Login');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errored: state.auth.error.login
    }),
    {
        login: AuthAct.login
    }
);

module.exports = internals.connect(Login);
