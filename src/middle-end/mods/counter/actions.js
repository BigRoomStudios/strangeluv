
const M = require('middle-end');

const { INCREMENT } = require('./action-types');

module.exports = {
    increment: M.createAction(INCREMENT)
};
