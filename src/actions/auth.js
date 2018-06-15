const StrangeAuth = require('strange-auth');
const WebClient = require('../utils/web-client');
const AuthAct = require('../action-types/auth');
const Router = require('react-router-redux');

const internals = {};

const actions = exports;

// New User Registration

exports.registrationRequest = ({ args }) => ({
    //We're not doing anything with the payload in this recipe
    type: AuthAct.REGISTRATION_BEGIN,
    payload: { args }
});

exports.registrationSuccess = (data) => ({
    //We're not doing anything with the payload in this recipe
    type: AuthAct.REGISTRATION_SUCCESS,
    payload: data
});

exports.registrationFailure = (errMessage) => ({
    type: AuthAct.REGISTRATION_FAILURE,
    payload: errMessage
});

exports.registerUser = ({ email, password, firstName, lastName }) => {

    return (dispatch) => {

        dispatch(actions.registrationRequest({ email, password, firstName, lastName }));

        const newUser = WebClient.post('/users', { email, password, firstName, lastName });

        newUser
        .then(({ response }) => {

            dispatch(actions.registrationSuccess(response));
            dispatch(actions.login({ email, password }));
        })
        .catch((err) => {

            let errMessage = 'Signup failed. Please try again.';

            if (typeof err.response !== 'undefined') {
                errMessage = err.response.data.message;
            }

            dispatch(actions.registrationFailure(errMessage));
        });

        return newUser;
    };

};

exports.rememberMe = (remember) => ({
    type: AuthAct.REMEMBER_ME,
    payload: remember
});

// Login and Logout

exports.login = ({ email, password, token }) => {

    return (dispatch) => {

        const strangeLogin = internals.strangeActions.login({ email, password, token });

        return dispatch(strangeLogin)

        .then(() => {

            dispatch(Router.push('/dashboard'));
        })
        .catch(console.warn.bind(console));
    };
};

exports.logout = () => {

    return (dispatch) => {

        dispatch(internals.strangeActions.logout());
        dispatch(Router.push('/'));
    };
};

// Request Reset & Reset Password

exports.requestResetRequest = ({ args }) => ({
    //We're not doing anything with the payload in this recipe
    type: AuthAct.REQUEST_PASSWORD_RESET_BEGIN,
    payload: args
});

exports.requestResetSuccess = (data) => ({
    //We're not doing anything with the payload in this recipe
    type: AuthAct.REQUEST_PASSWORD_RESET_SUCCESS,
    payload: data
});

exports.requestResetFailure = (errMessage) => ({
    type: AuthAct.REQUEST_PASSWORD_RESET_FAILURE,
    payload: errMessage
});

exports.resetPasswordRequest = ({ args }) => ({
    //We're not doing anything with the payload in this recipe
    type: AuthAct.RESET_PASSWORD_BEGIN,
    payload: args
});

exports.resetPasswordSuccess = (data) => ({
    //We're not doing anything with the payload in this recipe
    type: AuthAct.RESET_PASSWORD_SUCCESS,
    payload: data
});

exports.resetPasswordFailure = (errMessage) => ({
    type: AuthAct.RESET_PASSWORD_FAILURE,
    payload: errMessage
});

exports.requestPasswordReset = ({ email }) => {

    return (dispatch) => {

        dispatch(actions.requestResetRequest({ email }));

        return WebClient.post('/users/request-reset', { email }, { responseType: 'text' })

        .then(({ data, status }) => {

            dispatch(actions.requestResetSuccess(data));
            dispatch(Router.push('/login'));

        })
        .catch((err) => {

            let errMessage = 'Unable to reset password. Please try again';

            if (typeof err.response !== 'undefined') {
                errMessage = err.response.data.message;
            }

            dispatch(actions.requestResetFailure(errMessage));
        });
    };
};

exports.resetPassword = (email, newPassword, resetToken) => {

    return (dispatch) => {

        dispatch(actions.resetPasswordRequest({ email, newPassword, resetToken }));

        return WebClient.post('/users/reset-password', { email, newPassword, resetToken }, { responseType: 'text' })

        .then(({ data, status }) => {

            dispatch(actions.resetPasswordSuccess(data));
            dispatch(actions.login({ email, password: newPassword }));

        })
        .catch((err) => {

            let errMessage = 'Unable to reset password. Please try again.';

            if (typeof err.response !== 'undefined') {
                errMessage = err.response.data.message;
            }

            dispatch(actions.resetPasswordFailure(errMessage));
        });
    };
};

// StrangeAuth

internals.strangeActions = StrangeAuth.makeActions({
    login: ({ email, password, token }) => {

        let authPromise;
        let finalToken;

        if (token) {

            finalToken = token;

            authPromise = internals.getUser(finalToken);
        }
        else {

            authPromise = WebClient.post('/login', { email, password }, { responseType: 'text' })

            .then(({ data, status }) => {

                finalToken = data;

                return internals.getUser(finalToken);

            });
        }

        return authPromise.then(({ data, status }) => {

            return {
                credentials: {
                    token: finalToken,
                    user: data
                }
            };
        });
    }
});

internals.getUser = (token) => {

    return WebClient.get('/user', {
        headers: { authorization: `Bearer ${token}` }
    });
};
