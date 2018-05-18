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
        case 'MOON_LOAD':
            return Object.assign({}, state, {
                isLoading: true
            });
        case 'MOON_LOAD_FULFILLED':
            return Object.assign({}, state, {
                isLoading: false,
                moonId: payload.Index,
                error: null
            });
        case 'MOON_LOAD_REJECTED':
            return Object.assign({}, state, {
                isLoading: false,
                moonId: null,
                error: payload
            });
        default:
            return state;
    }
};
