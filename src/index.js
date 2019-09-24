const React = require('react');
const ReactDOM = require('react-dom');
const M = require('./middle-end');
const App = require('./App');

(() => {

    M.initialize();

    ReactDOM.render(
        <App store={M.store} history={M.mods.router.history} />,
        document.getElementById('root')
    );
})();
