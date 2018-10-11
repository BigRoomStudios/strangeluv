const Deeply = require('../utils/deeply');

module.exports = (state = { users: [] }, action) => {

    const { type, payload } = action;

    switch (type) {
        case 'GET_USERS_SUCCESS':

            return Deeply(state)
                .set('users', payload)
                .value();

    }

    return state;
};
