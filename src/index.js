const ReactDOM = require('react-dom');
const M = require('./middle-end');
const App = require('./App');
const Theme = require('./theme');

(() => {

    const middleEnd = M.create({
        basePath: process.env.BASE_PATH,
        logErrors: process.env.NODE_ENV !== 'test'
    }).initialize();

    ReactDOM.render(
        <App
            middleEnd={middleEnd}
            history={middleEnd.mods.router.history}
            theme={Theme}
        />,
        document.getElementById('root')
    );
})();
