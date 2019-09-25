const React = require('react');
const { NavLink } = require('react-router-dom');
const { default: Styled } = require('styled-components');

const internals = {};

module.exports = () => {

    const { Link } = internals;

    return (
        <div>
            <h1>Strangeluv</h1>
            <Link exact to='/'>Home</Link>
            {' · '}
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
