const { connectedRouterRedirect } = require('redux-auth-wrapper/history4/redirect');
const { useMiddleEnd } = require('strange-middle-end');

const internals = {};

internals.withMiddleEnd = (Component) => {

    return (props) => {

        const m = useMiddleEnd();

        return <Component {...props} m={m} />;
    };
};

internals.authRedirect = (config) => {

    const withAuthRedirect = connectedRouterRedirect(config);

    return (Component) => internals.withMiddleEnd(withAuthRedirect(Component));
};

exports.authenticate = internals.authRedirect({
    redirectPath: '/login',
    authenticatedSelector: (state, { m }) => m.selectors.auth.getIsAuthenticated(state),
    authenticatingSelector: (state, { m }) => !m.selectors.auth.getHasAuthenticationSettled(state),
    wrapperDisplayName: 'UserIsAuthenticated'
});
