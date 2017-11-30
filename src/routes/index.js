// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const Home = require('./home');
const CounterRoute = require('./counter');

// Create routes
module.exports = (store) => ([{
    path: '/',
    component: CoreLayout,
    childRoutes: [
        Home,
        CounterRoute(store)
    ]
}]);
