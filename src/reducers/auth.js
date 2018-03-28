const StrangeAuth = require('strange-auth');
const AuthTypes = require('../action-types/auth');
//const Deeply = require('../utils/deeply');

const authReducer = StrangeAuth.makeReducer();

module.exports = (state, action) => {

    state = authReducer(state, action);

    const { type } = action;
    const { payload } = action;

    switch (type) {

    //     case AuthTypes.NO_TOKEN:
    //
    //         // the user has hit the application without a token in local storage
    //         // so let's tell the app they are not logged in
    //         // this represents their first pass into our application
    //         return Deeply(state)
    //             .set('isAuthenticated', false)
    //             .set('status', '@@auth-status/FINISHED')
    //             .value();

        case AuthTypes.REMEMBER_ME:

            localStorage.setItem({ 'remember': payload });

            //set local storage??
            //set this in state????
    }

    return state;
};
