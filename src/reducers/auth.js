const StrangeAuth = require('strange-auth');
const AuthTypes = require('../action-types/auth');
const Deeply = require('../utils/deeply');
const RouterTypes = require('react-router-redux');

const authReducer = StrangeAuth.makeReducer();

module.exports = (state, action) => {

    state = authReducer(state, action);

    const { type } = action;
    const { payload } = action;

    switch (type) {

        case AuthTypes.REMEMBER_ME:

            return Deeply(state)
                .set('rememberMe', payload)
                .value();

        // Set server error message in state to display on our components
        // TODO one day clean this up with some action creator magic

        case AuthTypes.REGISTRATION_FAILURE:
        case AuthTypes.REQUEST_PASSWORD_RESET_FAILURE:
        case AuthTypes.RESET_PASSWORD_FAILURE:

            return Deeply(state)
                .set('error.message', payload)
                .value();

        // Clear server error message on route change to prevent
        // error messages from displaying when it doesn't make sense to the user
        // example: login attempt fails, user navigates away then back to login
        // user wouldn't expect to see the login error

        case RouterTypes.LOCATION_CHANGE:

            return Deeply(state)
                .set('error.message', null)
                .value();

        // Example of modifying a strange-auth action-type

        case StrangeAuth.types.LOGIN_FAIL:

            return Deeply(state)
                .set('error.message', 'Login failed, please check your email and password.')
                .value();
    }

    return state;
};
