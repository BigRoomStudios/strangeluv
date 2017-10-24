const CounterTypes = require('action-types/counter');

exports.increment = (amount = 1) => {

    return {
        type: CounterTypes.COUNTER_INCREMENT,
        payload: amount
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
