const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = ({ counter, increment, double }) => {

    const { CounterContainer, CounterText } = internals;

    return <div>
        <CounterContainer>
            Counter: <CounterText>{counter}</CounterText>
        </CounterContainer>
        <button onClick={increment}>
            Increment
        </button>
        {' '}
        <button onClick={double}>
            Double (Async)
        </button>
    </div>;
};

module.exports.propTypes = {
    counter: T.number.isRequired,
    double: T.func.isRequired,
    increment: T.func.isRequired
};

internals.CounterContainer = Styled.h2`
    margin: 1em auto;
`;

internals.CounterText = Styled.span`
    font-weight: bold;
    color: rgb(25, 200, 25);
`;
