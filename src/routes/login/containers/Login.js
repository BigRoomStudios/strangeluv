const Connect = require('react-redux').connect;
const Login = require('../components/Login');
const AuthAct = require('actions/auth');
const Router = require('react-router-redux');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errorMessage: state.auth.error.message
    }),
    {
        login: (...args) => {

            return (dispatch) => {

                return Promise.resolve()
                .then(() => dispatch(AuthAct.login(...args)))
                .then(() => dispatch(Router.push('/dashboard')));
            };
        },
        rememberAct: AuthAct.rememberMe
    }
);

module.exports = internals.connect(Login);
