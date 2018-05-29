const Connect = require('react-redux').connect;
const Dashboard = require('../components/Dashboard');
const AuthSelectors = require('selectors/auth');

const internals = {};

internals.connect = Connect(
    (state) => ({
        firstName: AuthSelectors.getUserName(state)
    })
);

module.exports = internals.connect(Dashboard);
