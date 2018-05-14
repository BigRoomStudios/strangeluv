const { COUNTER: Types } = require('action-types');

const internals = {
    initial: 0
};

module.exports = (state, action) => {

    state = state || internals.initial;

    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case Types.COUNTER_INCREMENT:
            return state + payload.amount;
        default:
            return state;
    }
};
