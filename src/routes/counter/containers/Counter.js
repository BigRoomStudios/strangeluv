const Connect = require('react-redux').connect;
const Counter = require('../components/Counter');
const M = require('middle-end');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        counter: M.selectors.counter.get(state)
    }),
    () => ({
        increment: () => M.dispatch.counter.increment(1)
    })
);

// Hook them up to the counter
module.exports = internals.connect(Counter);
