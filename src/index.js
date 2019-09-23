const React = require('react');
const ReactDOM = require('react-dom');
const M = require('./middle-end');
const Routes = require('./routes');

(() => {

    M.initialize();

    ReactDOM.render(
        <App
            store={M.store}
            history={M.mods.history}
            routes={Routes}
        />,
        document.getElementById('root')
    );
})();
