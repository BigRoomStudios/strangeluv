const MoonPhaseTypes = require('../action-types/moon-phase');

const internals = {
    initial: () => ({})
};

module.exports = (state, action) => {

    state = state || internals.initial();

    const type = action.type;
    const payload = action.payload;

    switch (type) {
        // case MoonPhaseTypes.ACTION_NAME:
        //     return state;
        default:
            return state;
    }
};
