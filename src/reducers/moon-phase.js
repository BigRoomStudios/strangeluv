const MoonPhaseTypes = require('../action-types/moon-phase');

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
        case MoonPhaseTypes.MOON_LOAD_START:
            return Object.assign({}, state, {
                isLoading: true
            });
        case MoonPhaseTypes.MOON_LOAD_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                moonId: payload.Index,
                error: null
            });
        case MoonPhaseTypes.MOON_LOAD_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                moonId: null,
                error: payload
            });
        default:
            return state;
    }
};
