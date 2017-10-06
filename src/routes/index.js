// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const Home = require('./home');
const CounterRoute = require('./counter');

// Create routes
module.exports = () => {

    const routes = [
        {
            path: '/',
            layout: CoreLayout,
            component: Home
        },
        {
            path: '/counter',
            layout: CoreLayout,
            component: CounterRoute
        }
    ];

    return routes;
};
