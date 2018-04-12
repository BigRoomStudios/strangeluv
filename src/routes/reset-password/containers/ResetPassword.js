const Connect = require('react-redux').connect;
const ResetPassword = require('../components/ResetPassword');
const AuthAct = require('actions/auth');

const internals = {};

internals.connect = Connect(
    null,
    {
        requestReset: AuthAct.ResetPassword
    }
);

module.exports = internals.connect(ResetPassword);
