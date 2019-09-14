const React = require('react');
const T = require('prop-types');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = (props) => {

    const {
        CounterContainer,
        CounterNumber
    } = internals;

    return (

        <div>
            <CounterContainer>
                {'Counter: '}
                <CounterNumber>
                    {props.counter}
                </CounterNumber>
            </CounterContainer>
            <button onClick={props.increment}>
                Increment
            </button>
        </div>

    );
};

module.exports.propTypes = {
    counter: T.number.isRequired,
    increment: T.func.isRequired
};

internals.CounterContainer = Styled.h2`
    margin: 1em auto;
`;

internals.CounterNumber = Styled.span`
    font-weight: bold;
    color: rgb(25, 200, 25);
`;
