const React = require('react');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');

const ButtonComponent = require('../material/button');
const ButtonStyledComponent = require('../material/button-styledComponent');
const Button = require('material-ui/Button').default;

module.exports = () => (

    <div>
        <h1>Strangeluv</h1>

        <ButtonComponent title='Button Title' path='/' /> {/* Button Component, with CSS class overrides */}

        <NavLink exact to='/counter' activeClassName={Classes.activeRoute}> {/* Button Component, with styled component */}
            <ButtonStyledComponent title='Styled Button Title' />
        </NavLink>

        <Button style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', borderRadius: 3, border: 0, height: 48, padding: '0 30', color: 'white' }}> Inline Style Button</Button> {/* Basic button */}

        <Button className={Classes.button}>CSS Module Button</Button>

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
