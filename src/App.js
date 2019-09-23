const React = require('react');
const T = require('prop-types');
const { Routes } = require('strange-router');
const ReactRedux = require('react-redux');
const { ConnectedRouter } = require('connected-react-router');
const GlobalStyles = require('./components/GlobalStyles');

module.exports = ({ store, routes, Router = ConnectedRouter, ...routerProps }) => {

    return <ReactRedux.Provider store={store}>
        <GlobalStyles />
        <Router {...routerProps}>
            <Routes routes={routes} />
        </Router>
    </ReactRedux.Provider>;
};

module.exports.propTypes = {
    store: T.object.isRequired,
    routes: T.array.isRequired,
    Router: T.elementType
};
