const React = require('react');
const DuckImage = require('../assets/duck.jpg');

module.exports = () => (

    <div>
        <h4>Welcome!</h4>
        <img
            alt='This is a duck, because Redux!'
            // className={Classes.duck}
            src={DuckImage}
        />
    </div>
);
