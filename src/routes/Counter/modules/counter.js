const KeyMirror = require('keymirror');

// Reducer
module.exports = exports = (state = 0, action) => {

    switch (action.type) {
        case types.COUNTER_INCREMENT:
            return state + action.payload;
            break;
        default:
            return state;
    }

};

// Export types
const types = exports.types = KeyMirror({
    COUNTER_INCREMENT: true
});

// Actions

exports.increment = (value = 1) => {

    return {
        type: types.COUNTER_INCREMENT,
        payload: value
    };
};

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

exports.doubleAsync = () => {

    return (dispatch, getState) => {

        return new Promise((resolve) => {
            setTimeout(() => {

                const count = getState().counter;
                const double = exports.increment(count);

                dispatch(double);
                resolve();
            }, 200);
        });
    };
};
