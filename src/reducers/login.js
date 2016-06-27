const Redux = require('redux');
const Forms = require('react-redux-form');

const internals = {
    initial: {
        username: '',
        password: ''
    }
};

// Create a reducer for the form and form values (model)

module.exports = Redux.combineReducers({
    // Ensure the form reducer and model reducer both
    // know where the model lives in the state tree
    form: Forms.formReducer('login.vals', internals.initial),
    vals: Forms.modelReducer('login.vals', internals.initial)
});
