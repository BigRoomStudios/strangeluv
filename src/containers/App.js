const React = require('react');
const Router = require('react-router-dom').BrowserRouter;
const Route = require('react-router-dom').Route;
// removed history from router in v4
const Provider = require('react-redux').Provider;

const CoreLayout = require('../layouts/CoreLayout');

module.exports = class App extends React.Component {

    static propTypes = {
        history: React.PropTypes.object.isRequired,
        routes: React.PropTypes.object.isRequired,
        routerKey: React.PropTypes.number,
        store: React.PropTypes.object.isRequired
    }

    render() {

        const { routes, store } = this.props;

        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router>
                        <Route path='/' component={CoreLayout} />
                    </Router>
                </div>
            </Provider>
        );
    }

};
