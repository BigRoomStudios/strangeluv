const MiddleEnd = require('strange-middle-end');
const { INCREMENT } = require('./action-types');

module.exports = MiddleEnd.createReducer(0, {
    [INCREMENT]: (state, { payload }) => state + payload.amount
});
