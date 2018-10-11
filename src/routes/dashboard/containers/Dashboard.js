const Connect = require('react-redux').connect;
const Dashboard = require('../components/Dashboard');
const AuthSelectors = require('selectors/auth');
const UserActions = require('actions/users');

const internals = {};

internals.connect = Connect(
    (state) => ({
        firstName: AuthSelectors.getUserName(state),
        users: state.users.users
    }),
    {
        getUsers: UserActions.getUsers
    }
);

module.exports = internals.connect(Dashboard);
