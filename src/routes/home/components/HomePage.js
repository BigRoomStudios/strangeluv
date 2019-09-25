const React = require('react');
const { default: Styled } = require('styled-components');
const DuckImage = require('../assets/duck.jpg');

const internals = {};

module.exports = () => {

    const { Image } = internals;

    return (
        <div>
            <h4>Welcome!</h4>
            <Image
                alt='This is a duck, because Redux!'
                src={DuckImage}
            />
        </div>
    );
};

internals.Image = Styled.img`
    display: block;
    width: 120px;
    margin: 1.5rem auto;
`;
