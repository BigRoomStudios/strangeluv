const Counter = require('./containers/Counter');

module.exports = (store) => ({
    path: 'counter',
    component: Counter,
    exact: true
});
