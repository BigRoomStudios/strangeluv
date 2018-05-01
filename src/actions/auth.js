const StrangeAuth = require('strange-auth');
const WebClient = require('../utils/web-client');
const History = require('../wiring/history');
const AuthAct = require('../action-types/auth');

const internals = {};

const actions = exports;

// New User Registration

exports.registrationRequest = () => {

    return {
        type: AuthAct.REGISTRATION_BEGIN
    };
};

exports.registrationSuccess = () => {

    return {
        type: AuthAct.REGISTRATION_SUCCESS
    };
};

exports.registrationFailure = (errMessage) => {

    return {
        type: AuthAct.REGISTRATION_FAILURE,
        payload: errMessage
    };
};

exports.registerUser = ({ email, password, firstName, lastName }) => {

    return (dispatch) => {

        dispatch(actions.registrationRequest());

        const newUser = WebClient.post('/users', { email, password, firstName, lastName });

        newUser
        .then(({ response }) => {

            //dispatch(SnackbarActions.messageSnackbar('Signup successful!'));
            dispatch(actions.registrationSuccess());
            dispatch(actions.login({ email, password }));
        })
        .catch((err) => {

            const errMessage = typeof err.response !== 'undefined' ? err.response.data.message : 'Signup failed. Please try again.';
            console.log(errMessage);
            //dispatch(SnackbarActions.messageSnackbar(errMessage));
            dispatch(actions.registrationFailure(errMessage));
        });

        return newUser;
    };

};

exports.rememberMe = ({ remember }) => {

    return {
        type: AuthAct.REMEMBER_ME,
        payload: remember
    };
};

// Login and Logout

exports.login = ({ email, password, token }) => {

    return (dispatch) => {

        const strangeLogin = internals.strangeActions.login({ email, password, token });

        return dispatch(strangeLogin)

        .then(() => {

            History.push('/dashboard');

        })
        .catch(::console.warn);
    };
};

exports.logout = () => {

    return (dispatch) => {

        dispatch(internals.strangeActions.logout());
        return History.push('/');
    };
};

// Request Reset & Reset Password

exports.requestResetRequest = () => {

    return {
        type: AuthAct.REQUEST_PASSWORD_RESET_BEGIN
    };
};

exports.requestResetSuccess = () => {

    return {
        type: AuthAct.REQUEST_PASSWORD_RESET_SUCCESS
    };
};

exports.requestResetFailure = () => {

    return {
        type: AuthAct.REQUEST_PASSWORD_RESET_FAILURE
    };
};

exports.resetPasswordRequest = () => {

    return {
        type: AuthAct.RESET_PASSWORD_BEGIN
    };
};

exports.resetPasswordSuccess = () => {

    return {
        type: AuthAct.RESET_PASSWORD_SUCCESS
    };
};

exports.resetPasswordFailure = () => {

    return {
        type: AuthAct.RESET_PASSWORD_FAILURE
    };
};

exports.requestPasswordReset = ({ email }) => {

    return (dispatch) => {

        dispatch(actions.requestResetRequest());

        return WebClient.post('/users/request-reset', { email }, { responseType: 'text' })
            .then(({ data, status }) => {

                //dispatch(SnackbarActions.messageSnackbar('Password reset email successfully sent!'));
                dispatch(actions.requestResetSuccess());
                return History.push('/login');

            })
            .catch((err) => {

                let errMessage = 'Unable to reset password. Please try again';

                if (typeof err.response !== 'undefined') {
                    errMessage = err.response.data.message;
                }

                dispatch(actions.requestResetFailure());

                //return dispatch(SnackbarActions.messageSnackbar(errMessage));
            })
        ;
    };
};

exports.resetPassword = (email, newPassword, resetToken) => {

    return (dispatch) => {

        dispatch(actions.resetPasswordRequest());

        return WebClient.post('/users/reset-password', { email, newPassword, resetToken }, { responseType: 'text' })
            .then(({ data, status }) => {

                //dispatch(SnackbarActions.messageSnackbar('Password successfully reset!'));
                dispatch(actions.resetPasswordSuccess());
                return History.push('/login');

            })
            .catch((ignoreErr) => {

                //return dispatch(SnackbarActions.messageSnackbar('Error resetting email, please try again!'));
                dispatch(actions.resetPasswordFailure());
            })
        ;
    };
};

// StrangeAuth

internals.strangeActions = StrangeAuth.makeActions({
    login: ({ email, password, token }) => {

        let authPromise;
        let finalToken;

        if ( !!token) {

            finalToken = token;

            authPromise = WebClient.get('/user', {
                headers: { authorization: `Bearer ${finalToken}` }
            });
        }

        else {

            authPromise = WebClient.post('/login', { email, password }, { responseType: 'text' })
            .then(({ data, status }) => {

                if (status !== 200) {
                    const err = new Error('Bad login');
                    err.info = data;
                    return Promise.reject(err);
                }

                finalToken = data;

                return WebClient.get('/user', {
                    headers: { authorization: `Bearer ${finalToken}` }
                });
            });
        }

        return authPromise.then(({ data, status }) => {

            if (status !== 200) {
                const err = new Error('Bad login');
                err.info = data;
                return Promise.reject(err);
            }

            return {
                credentials: {
                    token: finalToken,
                    user: data
                }
            };
        });
    }
});
