const H = require('middle-end/helpers');
const M = require('middle-end');

const {
    INCREMENT,
    DOUBLE_ASYNC
} = require('./action-types');

const internals = {};

exports.increment = H.makeAction(INCREMENT, {
    transform: (incrementBy = 1) => incrementBy
});

exports.doubleAsync = H.makeAction(DOUBLE_ASYNC, {
    handler: async (wait) => {

        return new Promise((resolve) => {

            setTimeout(() => {

                const count = M.selectors.counter.getCount(M.getState());
                const { payload: incrementedBy } = M.dispatch.counter.increment(count);

                resolve(count + incrementedBy);
            }, wait);
        });
    },
    after: async ({ original: wait, result }) => {

        console.log(`Doubled to "${result}" after ${wait}ms`);
    }
});
