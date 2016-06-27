const Strangeluv = require('strangeluv-core');

const wiring = module.exports = new Strangeluv(require.context('../', true, /\.js$/));

if (module.hot) {
    // Rebuild the sync reducers list
    module.hot.accept('./reducers.js', () => wiring.flushReducers());
}
