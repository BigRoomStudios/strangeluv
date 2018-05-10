const Connect = require('react-redux').connect;
const Signup = require('../components/Signup');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errorMessage: state.auth.error.message
    }),
    {
        onSubmit: AuthAct.registerUser,
        rememberAct: AuthAct.rememberMe
    }
);

module.exports = internals.connect(Signup);
