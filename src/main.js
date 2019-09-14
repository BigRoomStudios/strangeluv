const React = require('react');
const ReactDOM = require('react-dom');
const AppContainer = require('containers/App');
const M = require('middle-end');

// Initialize strange-middle-end
M.initialize();

// Developer Tools Setup

if (__DEBUG__) {
    if (window.devToolsExtension) {
        window.devToolsExtension.open();
    }
}

// Render Setup

const MOUNT_NODE = document.getElementById('root');

let render = () => {

    const routes = require('./routes')(M.store);

    ReactDOM.render(

        <AppContainer
            store={M.store}
            history={M.mods.router.history}
            routes={routes}
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
