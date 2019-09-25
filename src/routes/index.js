const React = require('react');
const Layout = require('../components/Layout');
const NotFoundPage = require('../components/NotFoundPage');
const NotFoundHelpers = require('./helpers/not-found');
const HomePage = require('./home/components/HomePage');

const CounterPage = React.lazy(() => import('./counter/containers/CounterPage'));

module.exports = [
    {
        path: '/',
        render: NotFoundHelpers.withNotFoundPage(Layout, NotFoundPage),
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
            },
            NotFoundHelpers.CatchAllRoute
        ]
    }
];
