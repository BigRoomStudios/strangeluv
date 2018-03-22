const React = require('react');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');

const ButtonComponent = require('../material/button');
const Button = require('material-ui/Button').default;

module.exports = () => (

    <div>
        <h1>Strangeluv</h1>

        <ButtonComponent title='Button Title' path='/' /> {/* Button Component, with CSS class overrides */}

        <Button color='secondary'>Secondary Button</Button> {/* Basic button */}

        <br />

        <NavLink exact to='/' activeClassName={Classes.activeRoute}>
          test
        </NavLink>
        {' · '}
        <NavLink to='/counter' activeClassName={Classes.activeRoute}>
            Counter
        </NavLink>
    </div>
);
