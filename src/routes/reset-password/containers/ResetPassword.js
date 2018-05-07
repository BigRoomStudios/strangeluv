const Connect = require('react-redux').connect;
const ResetPassword = require('../components/ResetPassword');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errorMessage: state.auth.error.message
    }),
    {
        resetPassword: AuthAct.resetPassword
    }
);

module.exports = internals.connect(ResetPassword);
