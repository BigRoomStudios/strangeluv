const React = require('react');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@material-ui/core/Typography');

const internals = {};

module.exports = () => {

    const { PageContainer, WelcomeMessage } = internals;

    return (
        <PageContainer>
            <WelcomeMessage>Welcome!</WelcomeMessage>
            <Typography>This page is exclusive to authenticated users. You're in <span role='img' aria-label='confetti'>🎉</span></Typography>
        </PageContainer>
    );
};

internals.PageContainer = Styled.div`
    align-self: center;
    margin: auto;
`;

internals.WelcomeMessage = Styled(Typography).attrs({ variant: 'h4', align: 'center' })`

    // Example leveraging the mui theme from inside a styled-component
    color: ${({ theme }) => theme.palette.secondary.main};
`;
