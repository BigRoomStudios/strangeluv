const MiddleEnd = require('strange-middle-end');
const { CREATE_ACCOUNT, LOGIN, LOGOUT } = require('./action-types');
const WebClient = require('../../utils/web-client');

const internals = {};

exports.createAccount = MiddleEnd.createAction(CREATE_ACCOUNT, {
    index: true,
    handler: async (accountInfo) => {

        const { data: results } = await WebClient.post('/users', accountInfo);
        return results;
    }
});

exports.login = MiddleEnd.createAction(LOGIN, {
    index: true,
    handler: async ({ email, password, token }) => {

        // See if the user has a token
        if (token) {
            // Check if the token is valid by hitting /user
            const { data: results } = await WebClient.get('/user', {
                headers: WebClient.getAuth({ token })
            });
            return { token, user: results };
        }
        else if (typeof token !== 'undefined') {
            const error = new Error('No login token on init');
            error.code = 'NO_TOKEN_ON_INIT';
            throw error;
        }

        // If there's no token, log in with a payload
        const { data: results } = await WebClient.post('/login', { email, password });
        return results;
    },
    after: ({ result }) => {

        const { token } = result;
        WebClient.updateAuth({ token });
    }
});

exports.logout = MiddleEnd.createAction(LOGOUT, {
    index: LOGIN.BASE,
    handler: async () => {

        try {
            await WebClient.post('/logout');
            return { loggedOut: true };
        }
        finally {
            // Clear the token in local storage
            WebClient.updateAuth({});
        }
    }
});
