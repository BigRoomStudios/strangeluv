const React = require('react');
const T = require('prop-types');
const { NavLink } = require('react-router-dom');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: AppBar } = require('@material-ui/core/AppBar');
const { default: Toolbar } = require('@material-ui/core/Toolbar');
const { default: Button } = require('@material-ui/core/Button');

const internals = {};

module.exports = (props) => {

    const { Link, SiteTitle } = internals;
    const { isAuthenticated, logout } = props;

    return (
        <AppBar position='static'>
            <Toolbar>
                <SiteTitle>Strangeluv</SiteTitle>
                <Link exact to='/'>Home</Link>
                <Link to='/counter'>Counter</Link>
                {isAuthenticated && <Button color='inherit' onClick={logout}>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
};

internals.Link = Styled(Button).attrs({ component: NavLink, color: 'inherit' })`
    &.active {
        font-weight: bold;
        text-decoration: underline;
    }
`;

internals.SiteTitle = Styled(Typography).attrs({ variant: 'h6' })`
    flex-grow: 1;
`;

module.exports.displayName = 'Header';

module.exports.propTypes = {
    isAuthenticated: T.bool,
    logout: T.func.isRequired
};
