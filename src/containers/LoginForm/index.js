const Connect = require('react-redux').connect;
const LoginForm = require('components/LoginForm');

const StrangeAuth = require('strange-auth');
const AuthActions = require('../../actions/auth');

const internals = {
    modelProp: (x) => {

        return x ? `login.vals.${x}` : 'login.vals';
    }
};

internals.connect = Connect(
    (state) => ({
        // State of the form fields
        fields: state.login.form.fields,
        // Successfully submitted?
        submitted: state.login.form.submitted,
        // Build name of a particular model property– the component should not know about the model
        modelProp: internals.modelProp,
        // Auth
        isLoggedIn: state.auth.isAuthenticated,
        isLoginPending: (state.auth.status === StrangeAuth.statuses.WAITING),
        authInfo: state.auth
    }),
    {
        authLogin: AuthActions.login,
        authLogout: AuthActions.logout
    }
);

module.exports = internals.connect(LoginForm);
