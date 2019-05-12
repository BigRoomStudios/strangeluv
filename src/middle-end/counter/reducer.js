const H = require('middle-end/helpers');
const { INCREMENT } = require('./action-types');

const internals = {};

internals.defaultState = () => ({
    count: 0
});

module.exports = H.makeReducer({ mutable: true }, internals.defaultState(), {
    [INCREMENT]: (state, { payload }) => {

        state.count = state.count + payload;
    }
});
