const Connect = require('react-redux').connect;
const Dashboard = require('../components/Dashboard');

const internals = {};

internals.connect = Connect(
    (state) => ({
        firstName: state.auth.credentials.user.firstName
    })

);

module.exports = internals.connect(Dashboard);
