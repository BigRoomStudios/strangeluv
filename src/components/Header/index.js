const React = require('react');
const Classes = require('./styles.scss');

// Styles

const LStyles = require('./styles'); // local styles
const { StyledLink } = LStyles;

// Component

module.exports = () => (

    <div>
        <h1>Strangeluv</h1>
        <StyledLink
            to='/'
            activeClassName={Classes.activeRoute}
        >
            Home
        </StyledLink>
        {' · '}
        <StyledLink
            to='/counter'
            color='orange' // Go have a look at StyledLink in LStyles
            activeClassName={Classes.activeRoute}
        >
            Counter
        </StyledLink>
    </div>

);
