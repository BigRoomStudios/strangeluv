const React = require('react');
const ReactDOM = require('react-dom');
const CreateStore = require('./wiring/create-store');
const AppContainer = require('./containers/App');
const createHistory = require('history').createBrowserHistory;
const History = createHistory();

// Create redux store and sync history with react-router-redux

const initialState = window.__INITIAL_STATE__;
const store = CreateStore(initialState);

// Developer Tools Setup

if (__DEBUG__) {
    if (window.devToolsExtension) {
        window.devToolsExtension.open();
    }
}

// Render Setup

const MOUNT_NODE = document.getElementById('root');
const Routes = require('./routes')(store);

let render = () => {

    ReactDOM.render(

        <AppContainer
            store={store}
            routes={Routes}
            history={History}
        />,
        MOUNT_NODE
    );
};

// when history changes, reload AppContainer
History.listen((location, action) => {

    render();
});

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle

if (__DEV__ && module.hot) {

    const RedBox = require('redbox-react').default;
    const renderApp = render;
    const renderError = (error) => {

        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {

        try {
            renderApp(Math.random());
        }
        catch (error) {
            console.error(error.stack);
            renderError(error);
        }
    };

    module.hot.accept(['./routes/index'], () => render());
}

// Go!
render();
