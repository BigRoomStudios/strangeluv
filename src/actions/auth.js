const StrangeAuth = require('strange-auth');
const WebClient = require('../utils/web-client');
const History = require('../wiring/history');
const AuthType = require('../action-types/auth');

const internals = {};

exports.noToken = () => {

    return {
        type: AuthType.NO_TOKEN
    };
};

exports.login = (email, password) => {

    return (dispatch) => {

        const strangeLogin = internals.strangeActions.login(email, password);

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
    login: (email, password) => {

        let token;

        return WebClient.post('/login', { email, password }, { responseType: 'text' })
        .then(({ data, status }) => {

            if (status !== 200) {
                const err = new Error('Bad login');
                err.info = data;
                return Promise.reject(err);
            }

            token = data;

            return WebClient.get('/user', {
                headers: { authorization: `Bearer ${token}` }
            });
        })
        .then(({ data, status }) => {

            if (status !== 200) {
                const err = new Error('Bad login');
                err.info = data;
                return Promise.reject(err);
            }

            return {
                credentials: {
                    token,
                    user: data
                }
            };
        });
    }
});
