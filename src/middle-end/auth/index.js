const MiddleEnd = require('strange-middle-end');

const {
    REGISTER,
    LOGIN,
    LOGOUT,
    FETCH_CURRENT_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD
} = require('./action-types');

const Storage = require('../../utils/storage');

// NOTE: We'll use the 'model' slice to manage auth in redux

const { createAction } = MiddleEnd;

module.exports = (m) => {

    const getClient = () => {

        const { client } = m.mods.app;
        return client;
    };

    return {
        initialize: () => m.dispatch.auth.fetchCurrentUser(),
        actions: {
            fetchCurrentUser: createAction(FETCH_CURRENT_USER, {
                index: true,
                handler: async () => {

                    const client = getClient();
                    const { data: results } = await client.get('/validate');
                    const { user, config } = results;

                    return { user, config };
                }
            }),
            login: createAction(LOGIN, {
                handler: async ({ username, password }) => {

                    const client = getClient();
                    const { data: results } = await client.post('/login', {
                        username,
                        password
                    }, {
                        reauthorize: false
                    });

                    if (results.accessToken) {
                        Storage.setItem('accessToken', results.accessToken);
                    }

                    await m.dispatch.auth.fetchCurrentUser();

                    const { query: { redirect } } = m.select.router.getLocation();

                    m.dispatch.router.push(decodeURIComponent(redirect || '/'));
                }
            }),
            register: createAction(REGISTER, {
                handler: async ({ name, username, password }) => {

                    const client = getClient();
                    await client.post('/register', {
                        name,
                        username,
                        password
                    }, {
                        reauthorize: false
                    });

                    await m.dispatch.auth.login({ username, password });
                }
            }),
            logout: createAction(LOGOUT, {
                index: FETCH_CURRENT_USER.BASE,
                handler: async ({ reauthorize } = {}) => {

                    const client = getClient();

                    try {
                        await client.logout({ reauthorize });
                        return null;
                    }
                    catch (err) {

                        if (err.response?.status === 401) {
                            return null;
                        }

                        throw err;
                    }
                }
            }),
            forgotPassword: createAction(FORGOT_PASSWORD, {
                handler: async ({ username }) => {

                    const client = getClient();
                    const { data } = await client.post('/forgot-password', { username });

                    return data;
                }
            }),
            resetPassword: createAction(RESET_PASSWORD, {
                handler: async ({ oldPassword, userHash, forgotPasswordToken, newPassword }) => {

                    const client = getClient();
                    const { data } = await client.post('/reset-password', { oldPassword, userHash, forgotPasswordToken, newPassword });

                    return data;
                }
            })
        },
        selectors: {
            getIsAuthenticated: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return !!index?.result;
            },
            getCurrentUser: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return index?.result?.user;
            },
            getHasAuthenticationSettled: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return !!index && !index.inFlight;
            }
        }
    };
};
