const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');

module.exports = class Header extends React.Component {

    static propTypes = {
        logout: T.func.isRequired,
        isAuthenticated: T.bool.isRequired
    };

    constructor(props) {

        super(props);

        this.renderNotAuthenticated = this._renderNotAuthenticated.bind(this);
        this.renderAuthenticated = this._renderAuthenticated.bind(this);

    }

    _renderNotAuthenticated() {

        return (
            <React.Fragment>
                {' · '}
                <NavLink to='/sign-up' activeClassName={Classes.activeRoute}>Sign Up</NavLink>
                {' · '}
                <NavLink to='/login' activeClassName={Classes.activeRoute}>Login</NavLink>
            </React.Fragment>
        );
    }

    _renderAuthenticated() {

        return (
            <React.Fragment>
                {' '}
                <button onClick={this.props.logout}>Logout</button>
            </React.Fragment>
        );
    }

    render() {

        const { isAuthenticated } = this.props;

        const renderedNav = isAuthenticated ? this.renderAuthenticated() : this.renderNotAuthenticated();

        return (

            <div>
                <h1>Strangeluv</h1>
                <NavLink exact to='/' activeClassName={Classes.activeRoute}>Home</NavLink>
                {' · '}
                <NavLink to='/dashboard' activeClassName={Classes.activeRoute}>Dashboard</NavLink>
                {renderedNav}
            </div>
        );
    }
};
