const FormActions = require('react-redux-form').actions;

// This action is a thunk
exports.submit = () => {

    return (dispatch, getState) => {

        // Access the login form values (model)
        // const login = getState().login.vals;

        const performLogin = new Promise((resolve, reject) => {

            setTimeout(resolve, 250);
        });

        // Tell action where the login model is
        return dispatch(FormActions.submit('login.vals', performLogin));
    };
};
