const Connect = require('react-redux').connect;
const Layout = require('../components/Layout');
const M = require('../middle-end');

const internals = {};

internals.connect = Connect(
    (state) => ({
        isAuthenticated: M.selectors.auth.getIsAuthenticated(state)
    }),
    (dispatch) => ({
        logout: async () => {

            const [err, result] = await M.dispatch.auth.logout();
            return [err, result];
        }
    })
);

module.exports = internals.connect(Layout);
