const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');

module.exports = class Header extends React.Component {

    static propTypes = {
        logout: T.func.isRequired,
        isAuthenticated: T.bool.isRequired
    };

    render() {

        const { isAuthenticated, logout } = this.props;

        return (

            <div>
                <h1>Strangeluv</h1>
                <NavLink exact to='/' activeClassName={Classes.activeRoute}>
                    Home
                </NavLink>
                {' · '}
                <NavLink to='/counter' activeClassName={Classes.activeRoute}>
                    Counter
                </NavLink>
                {' · '}
                <NavLink to='/dashboard' activeClassName={Classes.activeRoute}>
                    Dashboard
                </NavLink>
                {' · '}
                {!isAuthenticated &&
                    <NavLink to='/sign-up' activeClassName={Classes.activeRoute}>
                        Sign Up
                    </NavLink>
                }
                {!isAuthenticated &&
                    <span> · </span>
                }
                {isAuthenticated ? <button className='btn-link' onClick={logout}>Logout</button> : <NavLink to='/login' activeClassName={Classes.activeRoute}>Login</NavLink>}

            </div>
        );
    }
};
