const Connect = require('react-redux').connect;
const ForgotPassword = require('../components/ForgotPassword');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    null,
    {
        requestReset: AuthAct.requestPasswordReset
    }
);

module.exports = internals.connect(ForgotPassword);
