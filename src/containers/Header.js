const { connect } = require('react-redux');
const Header = require('components/Header');
const AuthActions = require('actions/auth');

module.exports = connect(
    (state) => ({
        isAuthenticated: state.auth.isAuthenticated
    }),
    {
        logout: AuthActions.logout
    }
)(Header);
