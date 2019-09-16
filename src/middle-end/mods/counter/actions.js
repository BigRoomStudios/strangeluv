
const MiddleEnd = require('strange-middle-end/dist/strange-middle-end');

const { INCREMENT } = require('./action-types');

module.exports = {
    increment: MiddleEnd.createAction(INCREMENT)
};
