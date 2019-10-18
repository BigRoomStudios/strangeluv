const React = require('react');
const { default: Styled } = require('styled-components');
const DuckImage = require('../assets/duck.jpg');
const { default: Typography } = require('@material-ui/core/Typography');

const internals = {};

module.exports = () => {

    const { Image, HomepageContainer, WelcomeMessage } = internals;

    return (
        <HomepageContainer>
            <WelcomeMessage variant='h4' align='center'>Welcome!</WelcomeMessage>
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

internals.HomepageContainer = Styled.div`
    align-self: center;
    margin: auto;
`;

internals.WelcomeMessage = Styled(Typography).attrs({ variant: 'h4', align: 'center' })`

    // Example leveraging the mui theme from styled-components
    color: ${(props) => props.theme.palette.duckYellow.main};
`;
