const Axios = require('axios');

const client = module.exports = Axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: 'json',
    headers: { common: {} }
});

client.updateAuth = ({ token }) => {

    const headers = client.defaults.headers.common;

    return Object.assign(headers, { authorization: `Bearer ${token}` });
};
