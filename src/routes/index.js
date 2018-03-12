// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const AdminLayout = require('../layouts/AdminLayout');
const Home = require('./home');
const Admin = require('./admin');
const CounterRoute = require('./counter');

// Create routes
module.exports = (store) => ([
    {
        path: '/admin',
        component: AdminLayout,
        childRoutes: [
            Admin,
            CounterRoute(store)
        ]
    },
    {
        path: '/',
        component: CoreLayout,
        childRoutes: [
            Home,
            CounterRoute(store)
        ]
    }
]);
