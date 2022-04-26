const { NavLink } = require('react-router-dom');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@mui/material/Typography');
const { default: AppBar } = require('@mui/material/AppBar');
const { default: Toolbar } = require('@mui/material/Toolbar');
const { default: Button } = require('@mui/material/Button');

const internals = {};

module.exports = () => {

    const { Link, SiteTitle } = internals;

    return (
        <AppBar position='static'>
            <Toolbar>
                <SiteTitle>Strangeluv</SiteTitle>
                <Link exact to='/'>Home</Link>
                <Link to='/counter'>Counter</Link>
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
