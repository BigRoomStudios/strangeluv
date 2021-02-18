const { Suspense } = require('react');
const T = require('prop-types');
const Header = require('./Header');
const ErrorFallback = require('./ErrorFallback');
const LoadingFallback = require('./LoadingFallback');
const { default: Styled } = require('styled-components');
const { ErrorBoundary } = require('react-error-boundary');

const internals = {};

module.exports = ({ children, location }) => {

    const { Container, AppContainer } = internals;

    return (
        <AppContainer>
            <Header />
            <Container>
                <ErrorBoundary key={location.key} FallbackComponent={ErrorFallback}>
                    <Suspense fallback={<LoadingFallback />}>
                        {children}
                    </Suspense>
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
    display: flex;
    padding-top:10px;

    // Alternatively,the Toolbar component in <Header /> could be given
    // a disableGutters prop, and the left/right padding could be applied
    // to the entire AppContainer.
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
