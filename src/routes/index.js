// Just the modules necessary for initial render!
const CoreLayout = require('../layouts/CoreLayout');
const Home = require('./Home');
const CounterRoute = require('./Counter');

// Create routes
module.exports = (store) => ({
    path: '/',
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
        CounterRoute(store)
    ]
});

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/
