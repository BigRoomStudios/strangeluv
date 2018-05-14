const { MOON_PHASE: Types } = require('action-types');

const internals = {
    // We want to keep track of...
    initial: () => ({
        isLoading: false, // whether we're waiting to know the moon phase,
        moonId: null,     // the moon phase id once it is fetched,
        error: null       // any error states that we entered while fetching the moon phase
    })
};

module.exports = (state, action) => {

    state = state || internals.initial();

    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case Types.MOON_LOAD.REQUEST:
            return Object.assign({}, state, {
                isLoading: true
            });
        case Types.MOON_LOAD.SUCCESS:
            if (!payload) {
                return state;
            }
            return Object.assign({}, state, {
                isLoading: false,
                moonId: payload.result.Index,
                error: null
            });
        case Types.MOON_LOAD.FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
                moonId: null,
                error: payload
            });
        default:
            return state;
    }
};
