const KeyMirror = require('keymirror');

module.exports = KeyMirror({
    REGISTRATION_REQUEST: true,
    REGISTRATION_SUCCESS: true,
    REGISTRATION_FAILURE: true,
    REQUEST_RESET_REQUEST: true,
    REQUEST_RESET_SUCCESS: true,
    REQUEST_RESET_FAILURE: true,
    RESET_PASSWORD_REQUEST: true,
    RESET_PASSWORD_SUCCESS: true,
    RESET_PASSWORD_FAILURE: true,
    LOGIN: true,
    LOGOUT: true,
    REMEMBER_ME: true
});
