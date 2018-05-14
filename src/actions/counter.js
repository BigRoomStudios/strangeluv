const T = require('prop-types');
const { makeActionCreator } = require('utils/redux-helpers');
const { COUNTER: Types } = require('action-types');

const actions = exports;

// Notice a limitation here -- can't set a default of 1 to increment
actions.increment = makeActionCreator(
    Types.COUNTER_INCREMENT,
    { amount: T.number }, // A schema of this action's arguments
    {} // Can put an { after } here if desired
);

actions.doubleAsync = makeActionCreator(
    Types.COUNTER_DOUBLE,
    {}, // No schema needed, as no args are passed
    {
        async: (request, { dispatch, getState }) => {

            return new Promise((resolve) => {

                setTimeout(() => {

                    const count = getState().counter;
                    const double = actions.increment({ amount: count });

                    dispatch(double);
                    resolve();
                }, 1000);
            });
        }
    }
);
