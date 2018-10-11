const Settings = require('./containers/Settings');
const Authenticate = require('../auth').authenticate;

module.exports = {
    path: 'settings',
    component: Authenticate(Settings),
    exact: true
};
