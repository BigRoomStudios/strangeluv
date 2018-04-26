const React = require('react');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');

const ButtonComponent = require('../material/button');
const ButtonStyledComponent = require('../material/button-styledComponent');
const ButtonEmotion = require('../material/button-emotion');
const Button = require('material-ui/Button').default;

module.exports = () => (

    <div>
        <h1>Strangeluv</h1>

        <ButtonComponent title='Button Title' path='/' /> {/* Button Component, with CSS class overrides */}

        <NavLink exact to='/counter' activeClassName={Classes.activeRoute}> {/* Button Component, with styled component */}
            <ButtonStyledComponent title='Styled Button Title' />
        </NavLink>

        <NavLink exact to='/counter' activeClassName={Classes.activeRoute}> {/* Button Component, with styled component */}
            <ButtonEmotion title='Im emotional' />
        </NavLink>

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
