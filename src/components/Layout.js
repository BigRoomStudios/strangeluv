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

// Alternatively, one could give the Toolbar component in <Header />
// a disableGutters prop, and apply the spacing to the whole thing.
internals.Container = Styled.div`
    display: flex;
    padding-top:10px;
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
    flex: 1;
    @media (min-width: ${(props) => props.theme.breakpoints.values.sm}px) {
        padding-left: ${(props) => props.theme.spacing(3)}px;
        padding-right: ${(props) => props.theme.spacing(3)}px;
    }
`;

internals.AppContainer = Styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;
