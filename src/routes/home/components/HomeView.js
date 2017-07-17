const React = require('react');
const DuckImage = require('../assets/duck.jpg');

// Styles

const LStyles = require('./styles'); // local styles
const { Duck } = LStyles;

// Component

module.exports = () => (

    <div>
        <h4>Welcome!</h4>
        <Duck
            alt='This is a duck, because Redux!'
            src={DuckImage}
        />
    </div>

);
