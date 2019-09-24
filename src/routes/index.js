const Layout = require('../components/Layout');
const HomePage = require('./home/components/HomePage');
const CounterPage = require('./counter/containers/CounterPage');

module.exports = [
    {
        path: '/',
        component: Layout,
        childRoutes: [
            {
                path: '/',
                component: HomePage,
                exact: true
            },
            {
                path: 'counter',
                component: CounterPage,
                exact: true
            }
        ]
    }
];
