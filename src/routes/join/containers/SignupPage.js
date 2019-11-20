const Connect = require('react-redux').connect;
const SignupPage = require('../components/SignupPage');
const M = require('../../../middle-end');

const internals = {};

internals.connect = Connect(
    (state) => ({}),
    (dispatch) => ({
        reqCreateAccount: async ( accountInfo ) => {

            const [err, result] = await M.dispatch.auth.createAccount(accountInfo);

            return [err, result];
        }
    })
);

module.exports = internals.connect(SignupPage);
