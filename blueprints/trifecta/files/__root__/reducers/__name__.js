const <%= pascalEntityName %>Types = require('../action-types/<%= entityName %>');

const internals = {
    initial: () => ({})
};

module.exports = (state, action) => {

    state = state || internals.initial();

    const type = action.type;
    const payload = action.payload;

    switch (type) {
        // case <%= pascalEntityName %>Types.ACTION_NAME:
        //     return state;
        default:
            return state;
    }
};
