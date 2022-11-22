const { LOGOUT } = require('./auth/action-types');

exports.logoutHandlers = (handler) => ({
    [LOGOUT.SUCCESS]: handler,
    [LOGOUT.FAIL]: handler
});
