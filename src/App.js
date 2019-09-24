const React = require('react');
const T = require('prop-types');
const HotLoader = require('react-hot-loader/root');
const ReactRedux = require('react-redux');
const { ConnectedRouter } = require('connected-react-router');
const StrangeRouter = require('strange-router');
const Routes = require('./routes');

// const GlobalStyles = require('./components/GlobalStyles');

module.exports = ({ store, Router = ConnectedRouter, ...routerProps }) => {

    return <ReactRedux.Provider store={store}>
        {/* <GlobalStyles /> */}
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
