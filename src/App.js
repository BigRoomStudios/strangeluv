const T = require('prop-types');
const HotLoader = require('react-hot-loader/root');
const ReactRedux = require('react-redux');
const Styled = require('styled-components');
const { default: CreateMuiTheme } = require('@mui/material/styles/createTheme');
const { default: MuiThemeProvider } = require('@mui/material/styles/ThemeProvider');
const { default: CssBaseline } = require('@mui/material/CssBaseline');
const StrangeRouter = require('strange-router');
const MiddleEnd = require('strange-middle-end');
const { ConnectedRouter } = require('connected-react-router');
const { ErrorBoundary } = require('react-error-boundary');
const ErrorFallback = require('./components/ErrorFallback');
const Routes = require('./routes');

module.exports = ({ middleEnd, theme = CreateMuiTheme(), Router = ConnectedRouter, ...routerProps }) => {

    const { store } = middleEnd;

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
    middleEnd: T.shape({
        store: T.object.isRequired
    }).isRequired,
    theme: T.object,
    Router: T.elementType
};

module.exports = HotLoader.hot(module.exports);
