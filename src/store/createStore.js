const Redux = require('redux');
const RouterMiddleware = require('react-router-redux').routerMiddleware;
const Thunk = require('redux-thunk').default;
const Reducers = require('./reducers');

module.exports = (initialState = {}, history) => {

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [Thunk, RouterMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = Redux.createStore(
    Reducers.makeRoot(),
    initialState,
    Redux.compose(
      Redux.applyMiddleware(...middleware),
      ...enhancers
    )
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').makeRoot;
      store.replaceReducer(reducers);
    });
  }

  return store;
}
