const React = require('react');
const T = require('prop-types');
const Router = require('react-router-dom').Router;
const Provider = require('react-redux').Provider;

module.exports = class App extends React.Component {

    static propTypes = {
        store: T.object.isRequired,
        routes: T.array,
        history: T.object.isRequired
    }

    render() {

        const { store, routes, history } = this.props;
        const pathName = history.location.pathname;

        let LayoutComponent;
        let RouteComponent;
        for (let i = 0; i < routes.length; ++i) {
            if (routes[i].path === pathName){
                LayoutComponent = routes[i].layout;
                RouteComponent = routes[i].component.component;
            }
        }
        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={history}>
                        <LayoutComponent children={<RouteComponent store={store} />} />
                    </Router>
                </div>
            </Provider>
        );
    }
};
