const HomeView = require('./containers/HomeView');

module.exports = (store) => ({
    path: '/',
    component: HomeView,
    exact: true
});
