const React = require('react');
const { default: Styled } = require('styled-components');
const DuckImage = require('../assets/duck.jpg');

const internals = {};

module.exports = () => {

    const { Image, HomepageContainer, WelcomeMessage } = internals;

    return (
        <HomepageContainer>
            <WelcomeMessage>Welcome!</WelcomeMessage>
            <Image
                alt='This is a duck, because Redux!'
                src={DuckImage}
            />
        </HomepageContainer>
    );
};

internals.Image = Styled.img`
    display: block;
    width: 120px;
    margin: 1.5rem auto;
`;

internals.WelcomeMessage = Styled.h4`
    text-align: center;

    // example usage of the styled-components theme
    color: ${({ theme }) => theme.colors.orange};
`;

internals.HomepageContainer = Styled.div`
    align-self: center;
    margin: auto;
`;
