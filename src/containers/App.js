const React = require('react');
const BrowserRouter = require('react-router-dom').BrowserRouter;
const Route = require('react-router-dom').Route;
const Provider = require('react-redux').Provider;
const CoreLayout = require('../layouts/CoreLayout');

module.exports = class App extends React.Component {

    static propTypes = {
        store: React.PropTypes.object.isRequired
    }

    render() {

        const { store } = this.props;

        return (
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <BrowserRouter>
                        <Route path='/' component={CoreLayout} />
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
};
