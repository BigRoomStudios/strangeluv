const { default: Axios } = require('axios');
const Storage = require('../utils/storage');

const internals = {};

module.exports = (m, { apiBaseUrl }) => {

    const client = internals.createClient({ baseURL: apiBaseUrl });

    return {
        client,
        initialize() {

            client.reauthorizedEvent.on(() => {
                // Don't refetch if reauth caused by an in-flight fetchCurrentUser()
                if (m.select.auth.getHasAuthenticationSettled()) {
                    m.dispatch.auth.fetchCurrentUser();
                }
            });

            client.interceptors.response.use(null, (error) => {

                if (error.config?.logoutOnFailure) {
                    (async () => {

                        await m.dispatch.auth.logout({
                            reauthorize: error.config.reauthorize
                        });
                    })();
                }

                throw error;
            });
        },
        actions: {},
        selectors: {}
    };
};

internals.createClient = (options) => {

    const client = Axios.create({
        headers: { common: {} },
        // Needed for refresh token, esp. in local development
        withCredentials: true,
        paramsSerializer: (obj) => {
            // The default serializer turns array params into ?trades[]=A&trades[]=B
            // which is not compatible with node's querystring parser which wants ?trades=A&trades=B.
            // Luckily URLSearchParams and node are in agreement, so we can customize for it below.

            if (!obj) {
                return '';
            }

            if (typeof obj === 'string') {
                return obj;
            }

            const params = new URLSearchParams();
            const append = (key, val) => {

                val = val instanceof Date ? val.toISOString() : val;

                params.append(key, val);
            };

            Object.entries(obj).forEach(([key, value]) => {

                if (Array.isArray(value)) {
                    value.forEach((val) => append(key, val));
                }
                else {
                    append(key, value);
                }
            });

            return params.toString();
        },
        ...options
    });

    client.reauthorizedEvent = internals.createEventEmitter();
    client.logout = async (opts) => {

        try {
            await client.post('/logout', null, opts);
        }
        finally {
            localStorage.removeItem('accessToken');
        }
    };

    client.interceptors.request.use(
        (config) => {

            const token = localStorage.getItem('accessToken');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }
    );

    client.interceptors.response.use(null, async (error) => {

        if (error.config?._isRetry) {
            throw error;
        }

        // If we receive a 401, hit '/reauthorize',
        // store the new token and retry the request
        if (error.config && error.config.reauthorize !== false && error.response?.status === 401 && Storage.getItem('accessToken')) {

            error.config._isRetry = true;

            try {
                const { data: results } = await client.get('/reauthorize', {
                    reauthorize: false,
                    logoutOnFailure: true
                });
                if (results.data) {
                    Storage.setItem('accessToken', results.data);
                    client.reauthorizedEvent.emit();
                }
            }
            catch (reauthErr) {

                if (Axios.isAxiosError(reauthErr)) {
                    // Rethrow the original error if /reauthorize fails so that
                    // consumers don't have to worry about this case.
                    throw error;
                }

                // Something unexpected, non-HTTP went wrong during reauth
                throw reauthErr;
            }

            // Retry after successful
            return client.request(error.config);
        }

        throw error;
    });

    return client;
};

internals.createEventEmitter = () => {

    const listeners = [];

    return {
        on(listener) {

            listeners.push(listener);
        },
        emit() {

            listeners.forEach((listener) => listener());
        }
    };
};
