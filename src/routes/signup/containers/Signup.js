const Connect = require('react-redux').connect;
const Signup = require('../components/Signup');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        // TODO: Have error in state like this, or dispatch an error action like MBM?
        errored: state.auth.error.login,
        rememberMe: state.auth.rememberMe
    }),
    {
        onSubmit: AuthAct.registerUser,
        rememberAct: AuthAct.rememberMe
    }
);

module.exports = internals.connect(Signup);
