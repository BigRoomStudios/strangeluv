const React = require('react');
const T = require('prop-types');
const { PageWrapper } = require('styles/global-components.js');
const { Typography } = require('@material-ui/core');

module.exports = class Dashboard extends React.Component {

    static propTypes = {
        firstName: T.string.isRequired
    };

    render() {

        const { firstName } = this.props;

        return (

            <PageWrapper>
                <Typography variant='display2' gutterBottom>Dashboard</Typography>
                <Typography>Welcome to your dashboard, {firstName}!</Typography>
            </PageWrapper>

        );
    }
};
