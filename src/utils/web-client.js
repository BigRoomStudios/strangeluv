const Axios = require('axios');

const client = module.exports = Axios.create({
    baseURL: process.env.API_BASE_URL,
    responseType: 'json',
    headers: { common: {} },
    transformResponse: (data) => {

        if (!data) {
            throw new Error('Empty response from the server');
        }

        // success is set on responses to POST requests
        // We check for that so we don't mistakenly fail GET requests, whose responses
        // are their results (array of some length, empty if nothing found)
        // TODO How should we handle errors in fetching data?
        if (data.hasOwnProperty('success') && !data.success) {
            throw new Error(data.message);
        }

        return data;
    }
});

client.updateConfiguration = ({ apiBaseUrl, ...rest }) => {

    if (apiBaseUrl || apiBaseUrl === '') {
        client.defaults.baseURL = apiBaseUrl;
    }
};
