const Connect = require('react-redux').connect;
const Settings = require('../components/Settings');
// const AuthAct = require('actions/auth');
const AuthSelectors = require('selectors/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        errorMessage: state.auth.error.message,
        userDetails: {
            firstName: AuthSelectors.getUserName(state),
            lastName: AuthSelectors.getUserLastName(state),
            email: AuthSelectors.getUserEmail(state)
        }
    }),
    {
        // onSubmit: AuthAct.registerUser
        onSubmit: () => console.log('Trying to submit on Settings page')
    }
);

module.exports = internals.connect(Settings);
