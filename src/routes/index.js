// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const Home = require('./home');
const CounterRoute = require('./counter');

// Create routesbut not all of us use the same
module.exports = {
    path: '/',
    component: CoreLayout,
    childRoutes: [
        {
            path: '/',
            component: HomeView,
            exact: true
        },
        {
            path: 'counter',
            component: Counter,
            exact: true
        }
    ]
};
