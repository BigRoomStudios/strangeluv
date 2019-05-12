const Connect = require('react-redux').connect;
const Counter = require('../components/Counter');

const M = require('middle-end');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        counter: M.selectors.counter.getCount(state)
    }),
    () => ({
        increment: () => M.dispatch.counter.increment(1),
        doubleAsync: () => M.dispatch.counter.doubleAsync(
            Math.round(Math.random() * 2000)
        )
    })
);

// Hook them up to the Counter component
module.exports = internals.connect(Counter);
