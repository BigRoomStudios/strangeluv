const React = require('react');
const LoginForm = require('containers/LoginForm');
const DuckImage = require('../assets/duck.jpg');
const Classes = require('./HomeView.scss');

module.exports = () => (

    <div>
        <h4>Welcome!</h4>
        <img
            alt='This is a duck, because Redux!'
            className={Classes.duck}
            src={DuckImage}
        />
        <LoginForm />
    </div>

);
