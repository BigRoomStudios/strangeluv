const Dashboard = require('./containers/Dashboard');
const Authenticate = require('../auth').authenticate;

module.exports = {

    path: 'dashboard',
    component: Authenticate(Dashboard),
    exact: true

};
