const Dashboard = require('./components/Dashboard');
const Authenticate = require('../auth').authenticate;

module.exports = {

    path: 'dashboard',
    component: Authenticate(Dashboard),
    exact: true

};
