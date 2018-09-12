const { connectedRouterRedirect } = require('redux-auth-wrapper/history4/redirect');
const AuthStatuses = require('strange-auth').statuses;
const Replace = require('react-router-redux').replace;

exports.authenticate = connectedRouterRedirect({
    authenticatedSelector: (state) => state.auth.isAuthenticated,
    authenticatingSelector: (state) => (state.auth.status === AuthStatuses.WAITING),
    redirectPath: '/login',
    redirectAction: Replace,
    failureRedirectPath: '/',
    allowRedirectBack: false
});
