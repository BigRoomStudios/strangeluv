// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const Home = require('./home');
const CounterRoute = require('./counter');
const LoginRoute = require('./login');
const DashboardRoute = require('./dashboard');
const withRouter = require('react-router').withRouter;
const Authenticate = require('./auth');

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
        },
        {
            path: '/login',
            layout: CoreLayout,
            component: LoginRoute
        },
        {
            path: '/dashboard',
            layout: withRouter(Authenticate(CoreLayout)),
            component: DashboardRoute
        }
    ];

    return routes;
};
