const React = require('react');
const DuckImage = require('../assets/duck.jpg');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = () => {

    const { Duck } = internals;

    return (

        <div>
            <h4>Welcome!</h4>
            <Duck src={DuckImage} />
        </div>
    );
};

internals.Duck = Styled.img`
    display: block;
    width: 120px;
    margin: 1.5rem auto;
`;
