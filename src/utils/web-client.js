const Axios = require('axios');

const client = module.exports = Axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: 'json',
    headers: { common: {} }
});

client.updateConfiguration = ({ apiBaseUrl, ...rest }) => {

    if (apiBaseUrl || apiBaseUrl === '') {
        client.defaults.baseURL = apiBaseUrl;
    }
};
