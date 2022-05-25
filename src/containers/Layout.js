const { useSelector } = require('react-redux');
const { useMiddleEnd } = require('strange-middle-end');
const Layout = require('../components/Layout');

const internals = {};

module.exports = function LayoutContainer(props) {

    const m = useMiddleEnd();

    const logout = () => m.dispatch.auth.logout();

    const isAuthenticated = useSelector(m.selectors.auth.getIsAuthenticated);

    return (<Layout {...props} isAuthenticated={isAuthenticated} logout={logout} />);
};
