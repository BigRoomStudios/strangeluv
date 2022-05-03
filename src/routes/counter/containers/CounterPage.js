const { useSelector } = require('react-redux');
const { useMiddleEnd } = require('strange-middle-end');
const CounterPage = require('../components/CounterPage');

module.exports = function CounterContainer() {

    const m = useMiddleEnd();
    const counter = useSelector(m.selectors.counter.getValue);
    const handleIncrement = () => m.dispatch.counter.increment({ amount: 1 });
    const handleDouble = () => m.dispatch.counter.double();

    return (
        <CounterPage
            counter={counter}
            increment={handleIncrement}
            double={handleDouble}
        />
    );
};
