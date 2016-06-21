const Redux = require('redux');
const RouterReducer = require('react-router-redux').routerReducer;

exports.makeRoot = (asyncReducers) => {

  return Redux.combineReducers({
    // Add sync reducers here
    router: RouterReducer,
    ...asyncReducers
  });
};

exports.inject = (store, { key, reducer }) => {

  store.asyncReducers[key] = reducer;

  const root = exports.makeRoot(store.asyncReducers);

  store.replaceReducer(root);
};
