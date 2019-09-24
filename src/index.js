const HotLoader = require('react-hot-loader');
const React = require('react');
const ReactDOM = require('react-dom');
const M = require('./middle-end');
const App = require('./App');

(() => {

    HotLoader.setConfig({
        errorReporter: () => null,
        ErrorOverlay: () => null
    });

    M.initialize();

    ReactDOM.render(
        <App store={M.store} history={M.mods.router.history} />,
        document.getElementById('root')
    );
})();
