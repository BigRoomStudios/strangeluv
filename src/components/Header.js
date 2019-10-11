const React = require('react');
const { NavLink } = require('react-router-dom');
const { default: Styled } = require('styled-components');

const internals = {};

// NOTE: This used to be written directly in the component with curly braces
// but there is a bug in eslint-plugin-react that says {' · '} fails linting
// even though it is valid
// Follow the issue's progress here https://github.com/yannickcr/eslint-plugin-react/issues/2454
const divider = ' · ';

module.exports = () => {

    const { Link } = internals;

    return (
        <div>
            <h1>Strangeluv</h1>
            <Link exact to='/'>Home</Link>
            {divider}
            <Link to='/counter'>Counter</Link>
        </div>
    );
};

internals.Link = Styled(NavLink)`
    &.active {
        font-weight: bold;
        text-decoration: underline;
    }
`;
