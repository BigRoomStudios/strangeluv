const React = require('react');
const ReactDOM = require('react-dom');
const SyncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
const CreateStore = require('./wiring/create-store');
const History = require('./wiring/history');
const AppContainer = require('./containers/App');

// Create redux store and sync history with react-router-redux

const initialState = window.__INITIAL_STATE__;
const store = CreateStore(initialState);
const enhancedHistory = SyncHistoryWithStore(History, store, {
    selectLocationState: (state) => state.router
});

// Developer Tools Setup

if (__DEBUG__) {
    if (window.devToolsExtension) {
        window.devToolsExtension.open();
    }
}

// Render Setup

const MOUNT_NODE = document.getElementById('root');

let render = (routerKey) => {

    routerKey = routerKey || null;
    const routes = require('./routes')(store);

    ReactDOM.render(
        <AppContainer
            store={store}
            history={enhancedHistory}
            routes={routes}
            routerKey={routerKey}
        />,
        MOUNT_NODE
    );
};

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
