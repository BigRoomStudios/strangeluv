const MiddleEnd = require('strange-middle-end');

module.exports = MiddleEnd.createTypes('auth', {
    REGISTER: MiddleEnd.type.async,
    LOGIN: MiddleEnd.type.async,
    LOGOUT: MiddleEnd.type.async,
    FORGOT_PASSWORD: MiddleEnd.type.async,
    RESET_PASSWORD: MiddleEnd.type.async,
    FETCH_CURRENT_USER: MiddleEnd.type.async
});
