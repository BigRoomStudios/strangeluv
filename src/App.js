const React = require('react');
const T = require('prop-types');
const HotLoader = require('react-hot-loader/root');
const ReactRedux = require('react-redux');
const Styled = require('styled-components');
const StrangeRouter = require('strange-router');
const { ConnectedRouter } = require('connected-react-router');
const { default: ErrorBoundary } = require('react-error-boundary');
const ErrorFallback = require('./components/ErrorFallback');
const GlobalStyle = require('./components/GlobalStyle');
const Routes = require('./routes');

module.exports = ({ store, theme = { colors: {} }, Router = ConnectedRouter, ...routerProps }) => {

    return (
        <Styled.ThemeProvider
            theme={theme}
        >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <GlobalStyle />
                <ReactRedux.Provider store={store}>
                    <Router {...routerProps}>
                        <StrangeRouter.Routes routes={Routes} />
                    </Router>
                </ReactRedux.Provider>
            </ErrorBoundary>
        </Styled.ThemeProvider>
    );
};

module.exports.propTypes = {
    store: T.object.isRequired,
    theme: T.object,
    Router: T.elementType
};

module.exports = HotLoader.hot(module.exports);
