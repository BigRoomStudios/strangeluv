const Axios = require('axios');

const client = module.exports = Axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: 'json',
    headers: { common: {} }
});

client.updateAuth = ({ token }) => {

    const headers = client.defaults.headers.common;
    const auth = client.getAuth({ token });

    Object.assign(headers, auth);

    if (!auth.authorization) {
        delete headers.authorization;
    }

    return headers;
};

client.getAuth = ({ token }) => {

    // Axios doesn't handle null/undefined headers well

    if (!token) {
        return {};
    }

    return {
        authorization: `Bearer ${token}`
    };
};
