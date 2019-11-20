const MiddleEnd = require('strange-middle-end');
const { CREATE_ACCOUNT, LOGIN } = require('./action-types');
const WebClient = require('../../utils/web-client');

const internals = {};

exports.createAccount = MiddleEnd.createAction(CREATE_ACCOUNT, {
    index: true,
    handler: async (accountInfo) => {

        const { data: results } = await WebClient.post('/users', accountInfo);
        return results;
    }
});

exports.login = MiddleEnd.createAction(LOGIN, {
    index: true,
    handler: async (loginInfo) => {

        const { data: results } = await WebClient.post('/login', loginInfo);
        return results;
    }
});
