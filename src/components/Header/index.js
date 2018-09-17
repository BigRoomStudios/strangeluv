const React = require('react');
const T = require('prop-types');
const NavLink = require('react-router-dom').NavLink;
const Classes = require('./styles.scss');
const { AppBar } = require('@material-ui/core');
const { Toolbar } = require('@material-ui/core');
const { Button } = require('@material-ui/core');



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
                <Button
                    component={(props) => <NavLink to='/sign-up' {...props} />}
                    activeClassName={Classes.activeRoute}
                >
                    Sign Up
                </Button>
                <Button
                    component={(props) => <NavLink to='/login' {...props} />}
                    activeClassName={Classes.activeRoute}
                >
                    Login
                </Button>
            </React.Fragment>
        );
    }

    _renderAuthenticated() {

        return (
            <React.Fragment>
                <Button
                    onClick={this.props.logout}
                >
                    Logout
                </Button>
            </React.Fragment>
        );
    }

    render() {

        const { isAuthenticated } = this.props;

        const renderedNav = isAuthenticated ? this.renderAuthenticated() : this.renderNotAuthenticated();

        return (

            <AppBar
                color='secondary'
            >
                <Toolbar>
                    <p>Strangeluv</p>
                    <Button
                        component={(props) => <NavLink exact to='/' {...props} />}
                        activeClassName={Classes.activeRoute}
                    >
                        Home
                    </Button>
                    <Button
                        component={(props) => <NavLink to='/dashboard' {...props} />}
                        activeClassName={Classes.activeRoute}
                    >
                        Dashboard
                    </Button>
                    {renderedNav}
                </Toolbar>
            </AppBar>
        );
    }
};
