const React = require('react');
const DuckImage = require('../assets/duck.jpg');
const Classes = require('./HomeView.scss');
const { PageWrapper } = require('styles/global-components.js');
const { Typography } = require('@material-ui/core');

module.exports = () => (

    <PageWrapper>
        <img
            alt='This is a duck, because Redux!'
            className={Classes.duck}
            src={DuckImage}
        />
        <Typography variant='display2' align='center'>Welcome!</Typography>
    </PageWrapper>

);
