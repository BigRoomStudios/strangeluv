const Connect = require('react-redux').connect;
const LoginPage = require('../components/LoginPage');
const M = require('../../../middle-end');

const internals = {};

internals.connect = Connect(
    (state) => ({}),
    (dispatch) => ({
        reqCreateAccount: async ( loginInfo ) => {

            const [err, result] = await M.dispatch.auth.login(loginInfo);

            return [err, result];
        }
    })
);

module.exports = internals.connect(LoginPage);
