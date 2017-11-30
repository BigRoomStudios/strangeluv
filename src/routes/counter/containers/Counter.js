const Connect = require('react-redux').connect;
const CounterAct = require('actions/counter');
const Counter = require('../components/Counter');

const internals = {};

// What state and actions do we want to hook-up?
internals.connect = Connect(
    (state) => ({
        counter: state.counter
    }),
    {
        increment: () => CounterAct.increment(1),
        doubleAsync: CounterAct.doubleAsync
    }
);

// Hook them up to the counter
module.exports = internals.connect(Counter);
