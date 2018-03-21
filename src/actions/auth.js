const StrangeAuth = require('strange-auth');
const WebClient = require('../utils/web-client');
const History = require('../wiring/history');

const internals = {};

exports.login = ({ email, password, token }) => {

    return (dispatch) => {

        const strangeLogin = internals.strangeActions.login({ email, password, token });

        return dispatch(strangeLogin)

        .then(() => {

            History.push('/dashboard');

        })
        .catch(::console.warn);
    };
};

exports.logout = () => {

    return (dispatch) => {

        dispatch(internals.strangeActions.logout());
        return History.push('/');
    };
};

internals.strangeActions = StrangeAuth.makeActions({
    login: ({ email, password, token }) => {

        let authPromise;
        let finalToken;

        if ( !!token) {

            finalToken = token;

            authPromise = WebClient.get('/user', {
                headers: { authorization: `Bearer ${finalToken}` }
            });
        }

        else {

            authPromise = WebClient.post('/login', { email, password }, { responseType: 'text' })
            .then(({ data, status }) => {

                if (status !== 200) {
                    const err = new Error('Bad login');
                    err.info = data;
                    return Promise.reject(err);
                }

                finalToken = data;

                return WebClient.get('/user', {
                    headers: { authorization: `Bearer ${finalToken}` }
                });
            });
        }

        return authPromise.then(({ data, status }) => {

            if (status !== 200) {
                const err = new Error('Bad login');
                err.info = data;
                return Promise.reject(err);
            }

            return {
                credentials: {
                    token: finalToken,
                    user: data
                }
            };
        });
    }
});
