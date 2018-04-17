const React = require('react');
const T = require('prop-types');

module.exports = class Dashboard extends React.Component {

    static propTypes = {
        firstName: T.string.isRequired
    };

    render() {

        const { firstName } = this.props;

        return (

            <div>
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard, {firstName}!</p>
            </div>

        );
    }
};
