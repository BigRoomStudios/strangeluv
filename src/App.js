const React = require('react');
const T = require('prop-types');
const HotLoader = require('react-hot-loader/root');
const ReactRedux = require('react-redux');
const { ConnectedRouter } = require('connected-react-router');
const StrangeRouter = require('strange-router');
const GlobalStyle = require('./components/GlobalStyle');
const Routes = require('./routes');

module.exports = ({ store, Router = ConnectedRouter, ...routerProps }) => {

    return <ReactRedux.Provider store={store}>
        <GlobalStyle />
        <Router {...routerProps}>
            <StrangeRouter.Routes routes={Routes} />
        </Router>
    </ReactRedux.Provider>;
};

module.exports.propTypes = {
    store: T.object.isRequired,
    Router: T.elementType
};

module.exports = HotLoader.hot(module.exports);
