const MiddleEnd = require('strange-middle-end');
const { INCREMENT, DOUBLE } = require('./action-types');

const internals = {};

module.exports = (m) => {

    return {
        increment: MiddleEnd.createAction(INCREMENT, ({ amount }) => {

            return { amount };
        }),
        double: MiddleEnd.createAction(DOUBLE, async () => {

            await internals.wait(200);

            const currentCount = m.select.counter.getValue();

            m.dispatch.counter.increment({ amount: currentCount });
        })
    };
};

internals.wait = (ms) => {

    return new Promise((resolve) => setTimeout(resolve, ms));
};
