const { useSelector } = require('react-redux');
const { useMiddleEnd } = require('strange-middle-end');
const Layout = require('../components/Layout');

const internals = {};

module.exports = function LayoutContainer(props) {

    const M = useMiddleEnd();

    const logout = async () => {

        const [err, result] = await M.dispatch.auth.logout();
        return [err, result];
    };

    const isAuthenticated = useSelector(M.selectors.auth.getIsAuthenticated);

    return (<Layout {...props} isAuthenticated={isAuthenticated} logout={logout} />);
};
