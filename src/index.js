const HotLoader = require('react-hot-loader');
const React = require('react');
const ReactDOM = require('react-dom');
const M = require('./middle-end');
const App = require('./App');
const Theme = require('./theme');

(() => {

    HotLoader.setConfig({
        errorReporter: () => null,
        ErrorOverlay: () => null
    });

    M.initialize();

    ReactDOM.render(
        <App
            middleEnd={M}
            history={M.mods.router.history}
            theme={Theme}
        />,
        document.getElementById('root')
    );
})();
