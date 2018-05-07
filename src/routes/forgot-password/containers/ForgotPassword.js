const Connect = require('react-redux').connect;
const ForgotPassword = require('../components/ForgotPassword');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errorMessage: state.auth.error.message
    }),
    {
        requestReset: AuthAct.requestPasswordReset
    }
);

module.exports = internals.connect(ForgotPassword);
