const Layout = require('../components/Layout');
const HomePage = require('./home/components/HomePage');
// const CounterRoute = require('./counter');

module.exports = {
    path: '/',
    component: Layout,
    childRoutes: [
        {
            path: '/',
            component: HomePage,
            exact: true
        }
        // {
        //     path: 'counter',
        //     component: Counter,
        //     exact: true
        // }
    ]
};
