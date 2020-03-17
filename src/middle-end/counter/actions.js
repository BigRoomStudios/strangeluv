const MiddleEnd = require('strange-middle-end');
const { INCREMENT, DOUBLE } = require('./action-types');
const M = require('..');

const internals = {};

exports.increment = MiddleEnd.createAction(INCREMENT, ({ amount }) => {

    return { amount };
});

exports.double = MiddleEnd.createAction(DOUBLE, async () => {

    await internals.wait(200);

    const currentCount = M.select.counter.getValue();

    M.dispatch.counter.increment({ amount: currentCount });
});

internals.wait = (ms) => {

    return new Promise((resolve) => setTimeout(resolve, ms));
};
