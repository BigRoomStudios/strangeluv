const React = require('react');
const Classes = require('./styles.scss');

// Styles

const lStyles = require('./styles'); // local styles
const { StyledLink } = lStyles;

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
            color='orange' // Go have a look at StyledLink in lStyles
            activeClassName={Classes.activeRoute}
        >
            Counter
        </StyledLink>
    </div>

);
