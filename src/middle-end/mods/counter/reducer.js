
const MiddleEnd = require('strange-middle-end');
const { INCREMENT } = require('./action-types');

const initialState = {};

module.exports = MiddleEnd.createReducer({ mutable: true }, initialState, {
    [INCREMENT]: (draft) => {

        draft.count++;
    }
});
