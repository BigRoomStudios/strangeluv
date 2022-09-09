const { lazy: Lazy } = require('react');
const Auth = require('./auth');
const Layout = require('../containers/Layout');
const NotFoundPage = require('../components/NotFoundPage');
const NotFoundHelpers = require('./helpers/not-found');
const HomePage = require('./home/components/HomePage');
const SignupPage = require('./join/containers/SignupPage');
const LoginPage = require('./login/containers/LoginPage');
const ForgotPasswordPage = require('./forgot-password/containers/ForgotPasswordPage');
const ResetPasswordPage = require('./reset-password/containers/ResetPasswordPage');
const ExclusivePage = require('./exclusive/components/ExclusivePage');

const CounterPage = Lazy(() => import('./counter/containers/CounterPage'));

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
                path: 'forgot-password',
                component: ForgotPasswordPage,
                exact: true
            },
            {
                path: 'reset-password',
                component: ResetPasswordPage,
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
