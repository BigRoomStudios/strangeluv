const MiddleEnd = require('strange-middle-end');
const { ROLES } = require('../../utils/constants');
const Client = require('../../utils/web-client');

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

    return {
        initialize: () => m.dispatch.auth.fetchCurrentUser(),
        actions: {
            fetchCurrentUser: createAction(FETCH_CURRENT_USER, {
                index: true,
                handler: async () => {

                    const { data: results } = await Client.get('/validate');
                    const { user, config } = results.data;

                    return { user, config };
                }
            }),
            login: createAction(LOGIN, {
                handler: async ({ username, password }) => {

                    const { data: results } = await Client.post('/login', {
                        username,
                        password
                    }, {
                        reauthorize: false
                    });

                    if (results.data.accessToken) {
                        Storage.setItem('accessToken', results.data.accessToken);
                    }

                    await m.dispatch.auth.fetchCurrentUser();

                    const { query: { redirect } } = m.select.router.getLocation();

                    m.dispatch.router.push(decodeURIComponent(redirect || '/'));
                }
            }),
            register: createAction(REGISTER, {
                handler: async ({ name, username, password }) => {


                    const { data: results } = await Client.post('/register', {
                        name,
                        username,
                        password
                    }, {
                        reauthorize: false
                    });

                    if (results.data.accessToken) {
                        Storage.setItem('accessToken', results.data.accessToken);
                    }

                    await m.dispatch.auth.fetchCurrentUser();
                }
            }),
            logout: createAction(LOGOUT, {
                index: FETCH_CURRENT_USER.BASE,
                handler: async ({ reauthorize } = {}) => {

                    try {
                        await Client.logout({ reauthorize });
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
                handler: async ({ email }) => {

                    await Client.post('/forgot-password', { username: email });
                }
            }),
            resetPassword: createAction(RESET_PASSWORD, {
                handler: async ({ token, hash, password }) => {

                    await Client.post('/reset-password', { token, hash, password });
                }
            })
        },
        selectors: {
            getIsAuthenticated: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return !!index?.result;
            },
            getIsViewOnly: (state) => {

                const role = m.selectors.auth.getUserRole(state);
                return role === ROLES.VIEW_ONLY;
            },
            getCurrentUser: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return index?.result?.user;
            },
            getUserRole: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return index?.result?.user.role;
            },
            getHasAuthenticationSettled: ({ model }) => {

                const { [FETCH_CURRENT_USER.BASE]: index } = model.indexes;
                return !!index && !index.inFlight;
            }
        }
    };
};
