const React = require('react');
const Auth = require('./auth');
const Layout = require('../containers/Layout');
const NotFoundPage = require('../components/NotFoundPage');
const NotFoundHelpers = require('./helpers/not-found');
const HomePage = require('./home/components/HomePage');
const SignupPage = require('./join/containers/SignupPage');
const LoginPage = require('./login/containers/LoginPage');
const ExclusivePage = require('./exclusive/components/ExclusivePage');

const CounterPage = React.lazy(() => import('./counter/containers/CounterPage'));

module.exports = [
    {
        path: '/',
        component: NotFoundHelpers.withNotFoundPage(Layout, NotFoundPage),
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
            {
                path: 'join',
                component: SignupPage,
                exact: true
            },
            {
                path: 'login',
                component: LoginPage,
                exact: true
            },
            {
                path: 'exclusive',
                component: Auth.authenticate(ExclusivePage),
                exact: true
            },
            NotFoundHelpers.CatchAllRoute
        ]
    }
];
