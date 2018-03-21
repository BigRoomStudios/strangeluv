const WebClient = require('../utils/web-client');

const internals = {
    lastToken: null
};

module.exports = (store) => {

    internals.maintainAuthToken(store);

    return store.subscribe(() => internals.maintainAuthToken(store));
};

internals.maintainAuthToken = (store) => {

    const auth = store.getState().auth;
    const newToken = (auth.isAuthenticated && auth.credentials && auth.credentials.token) || null;

    if (newToken === internals.lastToken) {
        return;
    }

    WebClient.updateAuth(newToken);

    internals.lastToken = newToken;
};
