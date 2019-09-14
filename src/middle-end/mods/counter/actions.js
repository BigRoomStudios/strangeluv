
const M = require('middle-end');

const { INCREMENT, DOUBLE } = require('./action-types');

module.exports = {
    increment: M.createAction(INCREMENT),
    double: M.createAction(DOUBLE, {
        handler: async () => {

            await new Promise((res) => setTimeout(res, 200));

            
        }
    })
};
