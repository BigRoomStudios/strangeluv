const React = require('react');
const T = require('prop-types');
const { Router: StrangeRouter } = require('strange-router');
const Provider = require('react-redux').Provider;
const { MuiThemeProvider } = require('@material-ui/core/styles');
const Theme = require('../styles/mui-theme');

module.exports = class App extends React.Component {

    static propTypes = {
        history: T.object.isRequired,
        routes: T.array.isRequired,
        store: T.object.isRequired
    }

    render() {

        const { store, routes, history } = this.props;

        return (
            <Provider store={store}>
                <MuiThemeProvider theme={Theme}>
                    <div style={{ height: '100%' }}>
                        <StrangeRouter
                            history={history}
                            routes={routes} />
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
};
