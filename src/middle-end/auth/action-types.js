const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('auth', {
    CREATE_ACCOUNT: MiddleEnd.type.async,
    LOGIN: MiddleEnd.type.async
});
