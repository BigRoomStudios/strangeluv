const FormActions = require('react-redux-form').actions;
const AuthActions = require('./auth');


// This action is a thunk
exports.login = () => {

    return (dispatch, getState) => {

        // Access the login form values (model)
        const login = getState().login.vals;
        
        const performLogin = new Promise((resolve, reject) => {
            console.log("HI!");
            dispatch(AuthActions.login(login.username, login.password, (err, res) => {

                // Latency sim
                setTimeout(() => {
                    resolve(err, res);
                }, 1000);

            }))
        });

        // Tell action where the login model is
        return dispatch(FormActions.submit('login.vals', performLogin));
    };
};

// This action is a thunk
exports.logout = () => {

    return (dispatch, getState) => {

        const performLogout = new Promise((resolve, reject) => {
            dispatch(AuthActions.logout((err, res) => {

                // Latency sim
                setTimeout(() => {
                    resolve(err, res);
                }, 1000);

            }))
        });

        // Tell action where the login model is
        return dispatch(FormActions.submit(performLogout));
    };
};
