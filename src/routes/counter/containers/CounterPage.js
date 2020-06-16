const React = require('react');
const { useCallback } = require('react');
const { useSelector } = require('react-redux');
const { useMiddleEnd } = require('strange-middle-end');
const CounterPage = require('../components/CounterPage');

module.exports = function CounterContainer() {

    const m = useMiddleEnd();
    const counter = useSelector(m.selectors.counter.getValue);
    const handleIncrement = useCallback(() => m.dispatch.counter.increment({ amount: 1 }), [m]);
    const handleDouble = useCallback(() => m.dispatch.counter.double(), [m]);

    return (
        <CounterPage
            counter={counter}
            increment={handleIncrement}
            double={handleDouble}
        />
    );
};
