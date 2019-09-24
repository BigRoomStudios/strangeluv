const { connect: Connect } = require('react-redux');
const CounterPage = require('../components/CounterPage');
const M = require('../../../middle-end');

const internals = {};

internals.connect = Connect(
    (state) => ({
        counter: M.selectors.counter.getValue(state)
    }),
    {
        increment: () => M.actions.counter.increment({ amount: 1 }),
        double: () => M.actions.counter.double()
    }
);

module.exports = internals.connect(CounterPage);
