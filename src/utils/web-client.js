const Axios = require('axios');

const internals = {
    // Configure this to your environment
    host: process.env.API_HOST || 'http://0.0.0.0:3001',
    prefix: process.env.API_PREFIX || '',
    getApiBase: () => {

        const { host, prefix } = internals;

        return `${host}${prefix}`;
    }
};

const client = module.exports = Axios.create({
    baseURL: internals.getApiBase(),
    responseType: 'json',
    headers: { common: {} }
});

client.batch = (requests) => {

    const prefix = internals.prefix;

    requests = requests.map((request) => {

        return {
            ...request,
            path: `${prefix}${request.path}`
        };
    });

    return client.post(internals.getApiBase(), { requests });
};

client.updateAuth = (newToken) => {

    const headers = client.defaults.headers.common;

    if (!newToken) {
        return delete headers.authorization;
    }

    headers.authorization = `Bearer ${newToken}`;
};
