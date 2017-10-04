const React = require('react');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');

module.exports = () => (

    <div>
        <h1>Strangeluv</h1>
        <NavLink to='/' activeClassName={Classes.activeRoute}>
            Home
        </NavLink>
        {' · '}
        <NavLink to='/counter' activeClassName={Classes.activeRoute}>
            Counter
        </NavLink>
    </div>

);
