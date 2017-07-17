
const React = require('react');
const T = require('prop-types');

// Styles

const LStyles = require('./styles'); // local styles

const {
    CounterContainer,
    CounterText,
    Button } = LStyles;

// Component

module.exports = class Counter extends React.PureComponent {

    static propTypes = {
        counter: T.number.isRequired,
        doubleAsync: T.func.isRequired,
        increment: T.func.isRequired
    };

    render() {

        const {
            counter,
            increment,
            doubleAsync } = this.props;

        return (
            <div>
                <CounterContainer>
                    Counter: {' '}
                    <CounterText>{counter}</CounterText>
                </CounterContainer>
                <Button
                    onClick={increment}
                >
                    Increment
                </Button>
                {' '}
                <Button
                    onClick={doubleAsync}
                >
                    Double (Async)
                </Button>
            </div>
        );
    };
};
