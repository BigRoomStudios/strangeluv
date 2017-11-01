const React = require('react');
const T = require('prop-types');
const Router = require('react-router-dom').Router;
const Route = require('react-router-dom').Route;
const Switch = require('react-router-dom').Switch;
const Provider = require('react-redux').Provider;

const CoreLayout = require('layouts/CoreLayout');

module.exports = class App extends React.Component {

    static propTypes = {
        store: T.object.isRequired,
        history: T.object.isRequired
    }

    render() {

        const { store, history } = this.props;

        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <Router history={history}>
                        <Switch>
                            <Route path={'/'} render={() =>

                                <CoreLayout />
                            } />
                        </Switch>
                    </Router>
                </div>
            </Provider>
        );
    }
};
