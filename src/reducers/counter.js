const CounterTypes = require('action-types/counter');

const internals = {
    initial: 0
};

module.exports = (state, action) => {

    state = state || internals.initial;

    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case CounterTypes.COUNTER_INCREMENT:
            return state + payload;
        default:
            return state;
    }
};
