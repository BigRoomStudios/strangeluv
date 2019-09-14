
const M = require('middle-end');
const { INCREMENT } = require('./action-types');

const initialState = {};

module.exports = M.createReducer({ mutable: true }, initialState, {
    [INCREMENT]: (draft) => {

        draft.count++;
    }
});
