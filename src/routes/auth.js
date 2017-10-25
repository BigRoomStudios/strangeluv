const connectedReduxRedirect = require('redux-auth-wrapper/history3/redirect').connectedReduxRedirect;
const AuthStatuses = require('strange-auth').statuses;
const History = require('wiring/history');

const Authenticate = connectedReduxRedirect({
    redirectPath: 'not-being-used',
    authenticatedSelector: (state) => state.auth.isAuthenticated !== false,
    authenticatingSelector: (state) => {

        return (state.auth.status === AuthStatuses.INIT) ||
                (state.auth.status === AuthStatuses.WAITING);
    },
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectAction: History.push('/login')
});

module.exports = Authenticate;
