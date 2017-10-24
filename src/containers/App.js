const React = require('react');
const PropTypes = require('prop-types');
const Router = require('react-router').Router;
const Provider = require('react-redux').Provider;

module.exports = class App extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired,
        routerKey: PropTypes.number,
        store: PropTypes.object.isRequired
    }

    render() {

        const { history, routes, routerKey, store } = this.props;

        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={history} children={routes} key={routerKey} />
                </div>
            </Provider>
        );
    }

};
