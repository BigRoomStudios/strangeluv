const React = require('react');
const ReactDOM = require('react-dom');
const CreateBrowserHistory = require('history/lib/createBrowserHistory');
const UseRouterHistory = require('react-router').useRouterHistory;
const SyncHistoryWithStore = require('react-router-redux').syncHistoryWithStore;
const RedBox = require('redbox-react');
const CreateStore = require('./store/createStore');
const AppContainer = require('./containers/AppContainer');

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = UseRouterHistory(CreateBrowserHistory)({
    basename: __BASENAME__
});

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.__INITIAL_STATE__;
const store = CreateStore(initialState, browserHistory);
const history = SyncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router
});

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
    if (window.devToolsExtension) {
        window.devToolsExtension.open();
    }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = (routerKey) => {

    routerKey = routerKey || null;
    const routes = require('./routes')(store);

    ReactDOM.render(
        <AppContainer
            store={store}
            history={history}
            routes={routes}
            routerKey={routerKey}
        />,
        MOUNT_NODE
    );
};

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {

    const renderApp = render;
    const renderError = (error) => {

        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    render = () => {

        try {
            renderApp(Math.random());
        }
        catch (error) {
            renderError(error);
        }
    };

    module.hot.accept(['./routes/index'], () => render());
}

// ========================================================
// Go!
// ========================================================
render();
