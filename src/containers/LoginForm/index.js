const Connect = require('react-redux').connect;
const LoginActions = require('actions/login');
const LoginForm = require('components/LoginForm');

const internals = {
    modelProp: (x) => {

        return x ? `login.vals.${x}` : 'login.vals';
    }
};

internals.connect = Connect(
    (state) => ({
        // State of the form fields
        fields: state.login.form.fields,
        // Build name of a particular model property– the component should not know about the model
        modelProp: internals.modelProp
    }),
    {
        submit: LoginActions.submit
    }
);

module.exports = internals.connect(LoginForm);
