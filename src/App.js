const React = require('react');
const T = require('prop-types');
const HotLoader = require('react-hot-loader/root');
const ReactRedux = require('react-redux');
const Styled = require('styled-components');
const { default: CreateMuiTheme } = require('@material-ui/core/styles/createMuiTheme');
const { default: MuiThemeProvider } = require('@material-ui/styles/ThemeProvider');
const { default: CssBaseline } = require('@material-ui/core/CssBaseline');
const StrangeRouter = require('strange-router');
const MiddleEnd = require('strange-middle-end');
const { ConnectedRouter } = require('connected-react-router');
const { default: ErrorBoundary } = require('react-error-boundary');
const ErrorFallback = require('./components/ErrorFallback');
const Routes = require('./routes');

module.exports = ({ middleEnd, store, theme = CreateMuiTheme(), Router = ConnectedRouter, ...routerProps }) => {

    return (
        <Styled.ThemeProvider theme={theme}>
            <MuiThemeProvider theme={theme}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <CssBaseline />
                    <MiddleEnd.Provider middleEnd={middleEnd}>
                        <ReactRedux.Provider store={store}>
                            <Router {...routerProps}>
                                <StrangeRouter.Routes routes={Routes} />
                            </Router>
                        </ReactRedux.Provider>
                    </MiddleEnd.Provider>
                </ErrorBoundary>
            </MuiThemeProvider>
        </Styled.ThemeProvider>
    );
};

module.exports.propTypes = {
    middleEnd: T.object,
    store: T.object.isRequired,
    theme: T.object,
    Router: T.elementType
};

module.exports = HotLoader.hot(module.exports);
