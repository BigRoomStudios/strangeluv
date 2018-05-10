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

        case AuthTypes.REGISTRATION_FAILURE:
        case AuthTypes.REQUEST_PASSWORD_RESET_FAILURE:
        case AuthTypes.RESET_PASSWORD_FAILURE:

            return Deeply(state)
                .set('error.message', payload)
                .value();

        case RouterTypes.LOCATION_CHANGE:

            return Deeply(state)
                .set('error.message', null)
                .value();

        case StrangeAuth.types.LOGIN_FAIL:

            return Deeply(state)
                .set('error.message', 'Login failed, please check your email and password.')
                .value();
    }

    return state;
};
