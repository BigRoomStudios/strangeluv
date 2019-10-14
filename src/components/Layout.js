const React = require('react');
const T = require('prop-types');
const Header = require('./Header');
const ErrorFallback = require('./ErrorFallback');
const LoadingFallback = require('./LoadingFallback');
const { default: Styled } = require('styled-components');
const { default: ErrorBoundary } = require('react-error-boundary');

const internals = {};

module.exports = ({ children, location }) => {

    const { Container, AppContainer } = internals;

    return (
        <AppContainer>
            <Header />
            <Container>
                <ErrorBoundary key={location.key} FallbackComponent={ErrorFallback}>
                    <React.Suspense fallback={<LoadingFallback />}>
                        {children}
                    </React.Suspense>
                </ErrorBoundary>
            </Container>
        </AppContainer>
    );
};

module.exports.propTypes = {
    children: T.any,
    location: T.shape({
        key: T.string
    })
};

internals.Container = Styled.div`
    padding-top:10px;
    flex: 1;
`;

internals.AppContainer = Styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;
