const Reducers = require('../../store/reducers');

module.exports = (store) => ({
  path: 'counter',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/CounterContainer');
      const reducer = require('./modules/counter');

      /*  Add the reducer to the store on key 'counter'  */
      Reducers.inject(store, { key: 'counter', reducer });

      /*  Return getComponent   */
      cb(null, Counter);

    /* Webpack named bundle   */
    }, 'counter');
  }
});
