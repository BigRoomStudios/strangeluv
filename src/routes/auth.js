const M = require('../middle-end');
const { default: connectedAuthWrapper } = require('redux-auth-wrapper/connectedAuthWrapper');
const NotFoundPage = require('../components/NotFoundPage');

exports.authenticate = connectedAuthWrapper({
    wrapperDisplayName: 'UserIsAuthenticated',
    authenticatedSelector: (state) => M.selectors.auth.getIsAuthenticated(state),
    authenticatingSelector: (state) => !M.selectors.auth.getHasAuthenticationSettled(state),
    FailureComponent: NotFoundPage
});
